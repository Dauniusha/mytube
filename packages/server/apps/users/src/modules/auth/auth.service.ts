import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
    CreateUserInput, SignInArgs, RefreshTokensArgs,
    AuthResult, TokenPayload, AuthUser, Tokens,
} from '@mytube/shared/users/models/auth';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from '../core/prisma/prisma.service';
import { User } from '../../prisma/generated';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly transactionService: PrismaService,
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    private hashPassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, Number(this.configService.getOrThrow<string>('PASSWORD_SALT_ROUNDS')));
    }

    private async validateUser(email: string, plainPassword: string): Promise<User> {
        const user = await this.usersRepository.getUser(email);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const passwordValid = await bcrypt.compare(plainPassword, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Incorrect password.');
        }

        return user;
    }

    private async createTokens(email: string): Promise<Tokens> {
        const tokenPayload: TokenPayload = { email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(tokenPayload, {
                secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION'),
            }),

            this.jwtService.signAsync(tokenPayload, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION'),
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async register(userRequest: CreateUserInput): Promise<AuthResult> {
        const user = await this.usersRepository.getUser(userRequest.email);

        if (user) {
            throw new Error('User with this email already exist.');
        }

        const [ hash, { accessToken, refreshToken } ] = await Promise.all([
            this.hashPassword(userRequest.password),
            this.createTokens(userRequest.email.toUpperCase()),
        ]);

        await this.transactionService.createTransaction((dbClient) => {
            return this.usersRepository.createUser({
                ...userRequest,
                refreshToken,
                password: hash,
            }, dbClient);
        });

        return new AuthResult(accessToken, refreshToken, user.onboardingStep);
    }

    async login(request: SignInArgs): Promise<AuthResult> {
        const { email, password: plainPassword } = request;
        const user = await this.validateUser(email, plainPassword);

        const { accessToken, refreshToken } = await this.createTokens(user.email);

        await this.usersRepository.updateUser({
            email: user.email,
            refreshToken,
        });

        return new AuthResult(accessToken, refreshToken, user.onboardingStep);
    }

    async refresh(request: RefreshTokensArgs): Promise<AuthResult> {
        const { email } = await this.jwtService.verifyAsync<TokenPayload>(request.refreshToken, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        });

        const user = await this.usersRepository.getUser(email);

        if (user.refreshToken !== request.refreshToken) {
            throw new Error('Refresh token expired.');
        }

        const { accessToken, refreshToken } = await this.createTokens(email);

        await this.usersRepository.updateUser({
            email: user.email,
            refreshToken,
        });

        return new AuthResult(accessToken, refreshToken, user.onboardingStep);
    }

    async signOut(request: TokenPayload) {
        await this.usersRepository.resetRefreshToken(request.email);
    }

    async getAuthUser(request: TokenPayload): Promise<AuthUser> {
        const {
            email,
            createdAt,
            updatedAt,
            lastSignIn,
            onboardingStep,
        } = await this.usersRepository.getUser(request.email) || {};

        if (!email) {
            throw new Error(`User ${request.email} not found.`);
        }

        return new AuthUser(email, createdAt, updatedAt, lastSignIn, onboardingStep);
    }

    async increaseOnboardingStep(request: TokenPayload) {
        const user = await this.usersRepository.getUser(request.email);
        return this.usersRepository.incrementOnboardingStep(user);
    }
}
