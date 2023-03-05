import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
    CreateUserDto, SignInDto, RefreshTokensDto, AuthResultDto, TokenPayload,
} from '@mytube/shared/users/models';
import { SIGN_IN_TOPIC, SIGN_UP_TOPIC, REFRESH_TOKENS_TOPIC, SIGN_OUT_TOPIC } from '@mytube/shared/users/constants';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(SIGN_UP_TOPIC)
    async signUp(@Payload() message: CreateUserDto): Promise<AuthResultDto> {
        return this.authService.register(message);
    }

    @MessagePattern(SIGN_IN_TOPIC)
    signIn(@Payload() message: SignInDto): Promise<AuthResultDto> {
        return this.authService.login(message);
    }

    @MessagePattern(REFRESH_TOKENS_TOPIC)
    refresh(@Payload() message: RefreshTokensDto): Promise<AuthResultDto> {
        return this.authService.refresh(message);
    }

    @MessagePattern(SIGN_OUT_TOPIC)
    async signOut(@Payload() message: TokenPayload) {
        await this.authService.signOut(message);
    }
}
