import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { VIDEOS_MICROCERVICE } from '@mytube/infrastructure';
import { JwtAuthGuard } from '../../core/auth';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UPLOAD_VIDEO_TOPIC } from '@mytube/shared/videos/constants/videos';
import { CreateVideoInput, PresignedUrl, Video } from '../../../../../../libs/shared/src/videos/models/videos';

@Resolver(() => Video)
@UseGuards(JwtAuthGuard)
export class VideosResolver implements OnModuleInit {
    constructor(@Inject(VIDEOS_MICROCERVICE) private readonly videosClient: ClientKafka) {}

    async onModuleInit() {
        this.videosClient.subscribeToResponseOf(UPLOAD_VIDEO_TOPIC);
        await this.videosClient.connect();
    }

    @Mutation(() => PresignedUrl)
    create(@Args('createvideoData') createvideoData: CreateVideoInput) {
        return this.videosClient.send(UPLOAD_VIDEO_TOPIC, { message: createvideoData });
    }
}
