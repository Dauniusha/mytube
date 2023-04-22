import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenPayload } from '@mytube/shared/users/models/auth';
import {
    CREATE_CHANNEL_TOPIC,
    EDIT_CHANNEL_TOPIC,
    GET_CHANNELS_TOPIC,
    GET_CHANNEL_TOPIC,
    GET_MY_CHANNEL_TOPIC,
} from '@mytube/shared/channels/constants/channels';
import { ChannelsService } from './channels.service';
import { Channel, CreateChannelInput, EditChannelInput, GetChannelArgs } from '@mytube/shared/channels/models/channels';

@Controller()
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) {}

    @MessagePattern(GET_CHANNEL_TOPIC)
    getChannel(@Payload('message') getChannelArgs: GetChannelArgs): Promise<Channel> {
        return this.channelsService.getChannel(getChannelArgs.ownerId, getChannelArgs.alias);
    }

    @MessagePattern(GET_CHANNELS_TOPIC)
    getChannels(): Promise<Channel[]> {
        return this.channelsService.getChannels();
    }

    @MessagePattern(GET_MY_CHANNEL_TOPIC)
    getMyChannel(@Payload('user') user: TokenPayload): Promise<Channel> {
        return this.channelsService.getMyChannel(user.email);
    }

    @MessagePattern(CREATE_CHANNEL_TOPIC)
    createChannel(
        @Payload('message') message: CreateChannelInput,
        @Payload('user') user: TokenPayload,
    ): Promise<Channel> {
        return this.channelsService.createChannel(user.email, message);
    }

    @MessagePattern(EDIT_CHANNEL_TOPIC)
    editChannel(
        @Payload('message') message: EditChannelInput,
        @Payload('user') user: TokenPayload,
    ): Promise<Channel> {
        return this.channelsService.editChannel(user.email, message);
    }
}
