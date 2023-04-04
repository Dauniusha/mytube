import { Module } from '@nestjs/common';
import { usersClientOptions } from '@mytube/infrastructure';
import { ClientsModule } from '@nestjs/microservices';
import { ChannelsRepository } from './repositories/channels.repository';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

@Module({
    imports: [
        ClientsModule.register([
            usersClientOptions('channels'),
        ]),
    ],
    providers: [ChannelsRepository, ChannelsService],
    controllers: [ChannelsController],
})
export class ChannelsModule {}
