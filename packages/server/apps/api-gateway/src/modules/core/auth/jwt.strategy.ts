import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from '@mytube/shared/users/models/auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: any): Promise<TokenPayload> {
        if (!payload.email) {
            throw new UnauthorizedException('invalid token payload.');
        }

        return { email: payload.email };
    }
}
