import {
    Body,
    Controller, Inject, OnModuleInit, Post, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto, SignInDto, RefreshTokensDto, TokenPayload } from '@mytube/shared/users/models';
import { SIGN_IN_TOPIC, SIGN_UP_TOPIC, REFRESH_TOKENS_TOPIC, SIGN_OUT_TOPIC } from '@mytube/shared/users/constants';
import { USERS_MICROCERVICE } from '../../../constants';
import { JwtAuthGuard, Public, User } from '../../core/auth';
import { map } from 'rxjs';

@UseGuards(JwtAuthGuard)
@Controller('users/auth')
export class AuthController implements OnModuleInit {
    constructor(@Inject(USERS_MICROCERVICE) private readonly usersClient: ClientKafka) {}

    async onModuleInit() {
        this.usersClient.subscribeToResponseOf(SIGN_UP_TOPIC);
        this.usersClient.subscribeToResponseOf(SIGN_IN_TOPIC);
        this.usersClient.subscribeToResponseOf(REFRESH_TOKENS_TOPIC);
        this.usersClient.subscribeToResponseOf(SIGN_OUT_TOPIC);
        await this.usersClient.connect();
    }

    @Public()
    @Post('sign-up')
    signUp(@Body() signUpRequest: CreateUserDto) {
        return this.usersClient.send(SIGN_UP_TOPIC, signUpRequest);
    }

    @Public()
    @Post('sign-in')
    signIn(@Body() signInRequest: SignInDto) {
        return this.usersClient.send(SIGN_IN_TOPIC, signInRequest);
    }

    @Public()
    @Post('refresh')
    refresh(@Body() refreshRequest: RefreshTokensDto) {
        return this.usersClient.send(REFRESH_TOKENS_TOPIC, refreshRequest);
    }

    @Post('sign-out')
    signOut(@User() user: TokenPayload) {
        return this.usersClient.send(SIGN_OUT_TOPIC, user)
            .pipe(map(() => ({})));
    }
}
