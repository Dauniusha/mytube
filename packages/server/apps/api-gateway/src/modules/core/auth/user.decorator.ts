import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@mytube/shared/users/models';
import { UserRequest } from './models/user-request.model';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
    (key: keyof TokenPayload, executionContext: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(executionContext);
        const { user } = ctx.getContext<{ req: UserRequest }>().req;

        return key ? user[key] : user;
    },
);
