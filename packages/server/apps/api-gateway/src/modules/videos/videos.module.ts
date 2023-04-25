import { Module } from '@nestjs/common';
import { videosClientOptions } from '@mytube/infrastructure';
import { ClientsModule } from '@nestjs/microservices';
import { VideoStreamingController } from './videos/video-streaming.controller';
import { VideosResolver } from './videos/videos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        ClientsModule.register([
            videosClientOptions('api-gateway'),
        ]),
        HttpModule,
    ],
    providers: [VideosResolver],
    controllers: [VideoStreamingController],
})
export class VideosModule {}
