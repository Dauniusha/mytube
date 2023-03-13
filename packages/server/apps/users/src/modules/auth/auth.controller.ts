import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
    CreateUserInput, SignInArgs, RefreshTokensArgs,
    AuthResult, TokenPayload, AuthUser,
} from '@mytube/shared/users/models';
import {
    SIGN_IN_TOPIC, SIGN_UP_TOPIC, REFRESH_TOKENS_TOPIC,
    SIGN_OUT_TOPIC, GET_AUTH_USER_TOPIC,
} from '@mytube/shared/users/constants';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(GET_AUTH_USER_TOPIC)
    getAuthUser(@Payload() message: TokenPayload): Promise<AuthUser> {
        return this.authService.getAuthUser(message);
    }

    @MessagePattern(SIGN_UP_TOPIC)
    signUp(@Payload() message: CreateUserInput): Promise<AuthResult> {
        return this.authService.register(message);
    }

    @MessagePattern(SIGN_IN_TOPIC)
    signIn(@Payload() message: SignInArgs): Promise<AuthResult> {
        return this.authService.login(message);
    }

    @MessagePattern(REFRESH_TOKENS_TOPIC)
    refresh(@Payload() message: RefreshTokensArgs): Promise<AuthResult> {
        return this.authService.refresh(message);
    }

    @MessagePattern(SIGN_OUT_TOPIC)
    async signOut(@Payload() message: TokenPayload) {
        await this.authService.signOut(message);
    }
}
