import { TokenPayload } from '@mytube/shared/users/models';

export interface UserRequest extends Request {
    user: TokenPayload;
}
