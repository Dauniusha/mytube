import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserProfileInput, EditUserProfileInput, GetUserProfileArgs, GetUserProfilesArgs, UserProfile } from '@mytube/shared/users/models/user-profiles';
import {
    CREATE_USER_PROFILE_TOPIC,
    EDIT_USER_PROFILE_TOPIC,
    GET_USER_PROFILE_TOPIC,
    GET_MY_PROFILE_TOPIC,
    GET_USER_PROFILES_TOPIC,
} from '@mytube/shared/users/constants/user-profiles';
import { TokenPayload } from '@mytube/shared/users/models/auth';
import { USERS_MICROCERVICE } from '@mytube/infrastructure/constants/users-microservice.constant';
import { JwtAuthGuard, User } from '../../core/auth';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserProfile) 
@UseGuards(JwtAuthGuard)
export class ProfilesResolver implements OnModuleInit {
    constructor(@Inject(USERS_MICROCERVICE) private readonly usersClient: ClientKafka) {}

    async onModuleInit() {
        this.usersClient.subscribeToResponseOf(GET_USER_PROFILE_TOPIC);
        this.usersClient.subscribeToResponseOf(GET_USER_PROFILES_TOPIC);
        this.usersClient.subscribeToResponseOf(CREATE_USER_PROFILE_TOPIC);
        this.usersClient.subscribeToResponseOf(EDIT_USER_PROFILE_TOPIC);
        this.usersClient.subscribeToResponseOf(GET_MY_PROFILE_TOPIC);
        await this.usersClient.connect();
    }

    @Query(() => UserProfile)
    getMyProfile(@User() user: TokenPayload) {
        return this.usersClient.send(GET_MY_PROFILE_TOPIC, user);
    }

    @Query(() => UserProfile)
    getUserProfile(
        @Args() getUserProfileArgs: GetUserProfileArgs,
    ) {
        return this.usersClient.send(GET_USER_PROFILE_TOPIC, { message: getUserProfileArgs });
    }

    @Query(() => [UserProfile])
    getUserProfiles(
        @Args() getUserProfilesArgs: GetUserProfilesArgs,
    ) {
        return this.usersClient.send(GET_USER_PROFILES_TOPIC, { message: getUserProfilesArgs });
    }

    @Mutation(() => UserProfile)
    createUserProfile(
        @Args('createUserProfileData') createProfileData: CreateUserProfileInput,
        @User() user: TokenPayload,
    ) {
        return this.usersClient.send(CREATE_USER_PROFILE_TOPIC, {
            message: createProfileData,
            user,
        });
    }

    @Mutation(() => UserProfile)
    editUserProfile(
        @Args('editUserProfileData') editProfileArgs: EditUserProfileInput,
        @User() user: TokenPayload,
    ) {
        return this.usersClient.send(EDIT_USER_PROFILE_TOPIC, {
            message: editProfileArgs,
            user,
        });
    }
}
