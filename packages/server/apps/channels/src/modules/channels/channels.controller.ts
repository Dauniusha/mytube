import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenPayload } from '@mytube/shared/users/models/auth';
import {
    CREATE_CHANNEL_TOPIC,
    EDIT_CHANNEL_TOPIC,
    GET_CHANNELS_TOPIC,
    GET_CHANNEL_TOPIC,
} from '@mytube/shared/channels/constants/channels';
import { ChannelsService } from './channels.service';
import { Channel, CreateChannelInput, EditChannelInput } from '@mytube/shared/channels/models/channels';

@Controller()
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) {}

    @MessagePattern(GET_CHANNEL_TOPIC)
    getUserProfile(@Payload('channelId') channelId: string): Promise<Channel> {
        return this.channelsService.getChannel(channelId);
    }

    @MessagePattern(GET_CHANNELS_TOPIC)
    getChannels(): Promise<Channel[]> {
        return this.channelsService.getChannels();
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
