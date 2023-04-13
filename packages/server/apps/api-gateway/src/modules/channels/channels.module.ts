import { Module } from '@nestjs/common';
import { channelsClientOptions } from '@mytube/infrastructure';
import { ClientsModule } from '@nestjs/microservices';
import { ChannelsResolver } from './channels/channels.resolver';

@Module({
    imports: [
        ClientsModule.register([
            channelsClientOptions('api-gateway'),
        ]),
    ],
    providers: [ChannelsResolver],
    controllers: [],
})
export class ChannelsModule {}
