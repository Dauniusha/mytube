import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CREATE_CHANNELS_USER_TOPIC, DELETE_CHANNELS_USER_TOPIC } from '@mytube/shared/channels/constants/users';
import { CreateChannelUserDto, DeleteChannelUserDto } from '@mytube/shared/channels/models/users';

@Controller()
export class UsersConsumer {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern(CREATE_CHANNELS_USER_TOPIC)
    createUser(@Payload('message') message: CreateChannelUserDto) {
        return this.usersService.createUser(message);
    }

    @EventPattern(DELETE_CHANNELS_USER_TOPIC)
    deleteUser(@Payload('message') message: DeleteChannelUserDto) {
        return this.usersService.deleteUser(message);
    }
}
