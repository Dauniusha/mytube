import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
    CreateUserInput, SignInArgs, RefreshTokensArgs,
    TokenPayload, AuthResult, AuthUser, SignOut,
} from '@mytube/shared/users/models';
import {
    SIGN_IN_TOPIC, SIGN_UP_TOPIC, REFRESH_TOKENS_TOPIC,
    SIGN_OUT_TOPIC, GET_AUTH_USER_TOPIC,
} from '@mytube/shared/users/constants';
import { USERS_MICROCERVICE } from '../../../constants';
import { JwtAuthGuard, Public, User } from '../../core/auth';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => AuthResult)
@UseGuards(JwtAuthGuard)
export class AuthResolver implements OnModuleInit {
    constructor(@Inject(USERS_MICROCERVICE) private readonly usersClient: ClientKafka) {}

    async onModuleInit() {
        this.usersClient.subscribeToResponseOf(GET_AUTH_USER_TOPIC);
        this.usersClient.subscribeToResponseOf(SIGN_UP_TOPIC);
        this.usersClient.subscribeToResponseOf(SIGN_IN_TOPIC);
        this.usersClient.subscribeToResponseOf(REFRESH_TOKENS_TOPIC);
        this.usersClient.subscribeToResponseOf(SIGN_OUT_TOPIC);
        await this.usersClient.connect();
    }

    @Query(() => AuthUser)
    getAuthUser(@User() user: TokenPayload) {
        return this.usersClient.send(GET_AUTH_USER_TOPIC, user);
    }

    @Mutation(() => AuthResult)
    @Public()
    signUp(@Args('signUpData') signUpData: CreateUserInput) {
        return this.usersClient.send(SIGN_UP_TOPIC, signUpData);
    }

    @Mutation(() => AuthResult)
    @Public()
    signIn(@Args() signInArgs: SignInArgs) {
        return this.usersClient.send(SIGN_IN_TOPIC, signInArgs);
    }

    @Mutation(() => AuthResult)
    @Public()
    refresh(@Args() refreshTokensArgs: RefreshTokensArgs) {
        return this.usersClient.send(REFRESH_TOKENS_TOPIC, refreshTokensArgs);
    }

    @Mutation(() => SignOut, { nullable: true })
    signOut(@User() user: TokenPayload) {
        return this.usersClient.send(SIGN_OUT_TOPIC, user);
    }
}
