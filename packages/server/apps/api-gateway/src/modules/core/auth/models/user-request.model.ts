import { TokenPayload } from '@mytube/shared/users/models/auth';

export interface UserRequest extends Request {
    user: TokenPayload;
}
