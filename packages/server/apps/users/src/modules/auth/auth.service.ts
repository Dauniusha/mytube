import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
    CreateUserDto, SignInDto, AuthResultDto,
    RefreshTokensDto, TokenPayload,
} from '@mytube/shared/users/models';
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

    private async createTokens(email: string): Promise<AuthResultDto> {
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

        return new AuthResultDto(accessToken, refreshToken);
    }

    async register(userRequest: CreateUserDto): Promise<AuthResultDto> {
        const user = await this.usersRepository.getUser(userRequest.email);

        if (user) {
            throw new Error('User with this email already exist.');
        }

        const [ hash, tokens ] = await Promise.all([
            this.hashPassword(userRequest.password),
            this.createTokens(userRequest.email.toUpperCase()),
        ]);

        await this.transactionService.createTransaction((dbClient) => {
            return this.usersRepository.createUser({
                ...userRequest,
                refreshToken: tokens.refreshToken,
                password: hash,
            }, dbClient);
        });

        return tokens;
    }

    async login(request: SignInDto): Promise<AuthResultDto> {
        const { email, password: plainPassword } = request;
        const user = await this.validateUser(email, plainPassword);

        const tokens = await this.createTokens(user.email);

        await this.usersRepository.updateUser({
            email: user.email,
            refreshToken: tokens.refreshToken,
        });

        return tokens;
    }

    async refresh(request: RefreshTokensDto): Promise<AuthResultDto> {
        const { email } = await this.jwtService.verifyAsync<TokenPayload>(request.refreshToken);

        const user = await this.usersRepository.getUser(email);

        if (user.refreshToken !== request.refreshToken) {
            throw new Error('Refresh token expired.');
        }

        const tokens = await this.createTokens(email);

        await this.usersRepository.updateUser({
            email: user.email,
            refreshToken: tokens.refreshToken,
        });

        return tokens;
    }

    async signOut(request: TokenPayload) {
        await this.usersRepository.resetRefreshToken(request.email);
    }
}
