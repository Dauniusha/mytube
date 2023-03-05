import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@mytube/shared/users/models';
import { UserRequest } from './models/user-request.model';

export const User = createParamDecorator(
    (key: keyof TokenPayload, ctx: ExecutionContext) => {
        const { user } = ctx.switchToHttp().getRequest<UserRequest>();
        return key ? user[key] : user;
    },
);
