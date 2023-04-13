import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserProfileInput, EditUserProfileInput, GetUserProfileArgs, UserProfile } from '@mytube/shared/users/models/user-profiles';
import { TokenPayload } from '@mytube/shared/users/models/auth';
import {
    GET_USER_PROFYLE_BY_USERNAME_TOPIC,
    CREATE_USER_PROFILE_TOPIC,
    EDIT_USER_PROFILE_TOPIC,
    GET_USER_PROFILE_TOPIC,
} from '@mytube/shared/users/constants/user-profiles';
import { ProfilesService } from './profiles.service';

@Controller()
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @MessagePattern(GET_USER_PROFILE_TOPIC)
    getUserProfile(@Payload('email') email: string): Promise<UserProfile> {
        return this.profilesService.getProfile(email);
    }

    @MessagePattern(GET_USER_PROFYLE_BY_USERNAME_TOPIC)
    getUserProfileByUsername(
        @Payload('message') message: GetUserProfileArgs,
    ): Promise<UserProfile> {
        return this.profilesService.getProfileByUsername(message.username);
    }

    @MessagePattern(CREATE_USER_PROFILE_TOPIC)
    createUserProfile(
        @Payload('message') message: CreateUserProfileInput,
        @Payload('user') user: TokenPayload,
    ): Promise<UserProfile> {
        return this.profilesService.createProfile(user.email, message);
    }

    @MessagePattern(EDIT_USER_PROFILE_TOPIC)
    editUserProfile(
        @Payload('message') message: EditUserProfileInput,
        @Payload('user') user: TokenPayload,
    ): Promise<UserProfile> {
        return this.profilesService.editProfile(user.email, message);
    }
}
