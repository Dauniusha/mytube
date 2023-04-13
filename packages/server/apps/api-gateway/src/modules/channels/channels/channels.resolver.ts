import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TokenPayload } from '@mytube/shared/users/models/auth';
import { JwtAuthGuard, User } from '../../core/auth';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    CREATE_CHANNEL_TOPIC, EDIT_CHANNEL_TOPIC,
    GET_CHANNELS_TOPIC, GET_CHANNEL_TOPIC,
} from '@mytube/shared/channels/constants/channels';
import { Channel, CreateChannelInput, EditChannelInput, GetChannelArgs } from '@mytube/shared/channels/models/channels';
import { CHANNELS_MICROCERVICE } from '@mytube/infrastructure';

@Resolver(() => Channel) 
@UseGuards(JwtAuthGuard)
export class ChannelsResolver implements OnModuleInit {
    constructor(@Inject(CHANNELS_MICROCERVICE) private readonly channelsClient: ClientKafka) {}

    async onModuleInit() {
        this.channelsClient.subscribeToResponseOf(GET_CHANNEL_TOPIC);
        this.channelsClient.subscribeToResponseOf(GET_CHANNELS_TOPIC);
        this.channelsClient.subscribeToResponseOf(CREATE_CHANNEL_TOPIC);
        this.channelsClient.subscribeToResponseOf(EDIT_CHANNEL_TOPIC);
        await this.channelsClient.connect();
    }

    @Query(() => Channel)
    getChannel(@Args() getChannelArgs: GetChannelArgs) {
        return this.channelsClient.send(GET_CHANNEL_TOPIC, getChannelArgs);
    }

    @Query(() => [Channel])
    getChannels() {
        return this.channelsClient.send(GET_CHANNELS_TOPIC, {});
    }

    @Mutation(() => Channel)
    createChannel(
        @Args('createChannelData') createChannelData: CreateChannelInput,
        @User() user: TokenPayload,
    ) {
        console.log(createChannelData)
        return this.channelsClient.send(CREATE_CHANNEL_TOPIC, {
            message: createChannelData,
            user,
        });
    }

    @Mutation(() => Channel)
    editChannel(
        @Args('editChannelData') editChannelData: EditChannelInput,
        @User() user: TokenPayload,
    ) {
        return this.channelsClient.send(EDIT_CHANNEL_TOPIC, {
            message: editChannelData,
            user,
        });
    }
}
