import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { VIDEOS_MICROCERVICE } from '@mytube/infrastructure';
import { JwtAuthGuard } from '../../core/auth';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DISLIKE_VIDEO_TOPIC, GET_VIDEO_TOPIC, LIKE_VIDEO_TOPIC, UPLOAD_VIDEO_TOPIC } from '@mytube/shared/videos/constants';
import { CreateVideoInput, GetVideoArgs, Like, LikeVideoArgs, PresignedUrl, Video } from '@mytube/shared/videos/models/videos';
import { Void } from '@mytube/shared/core/scalars/void.scalar';

@Resolver(() => Video)
@UseGuards(JwtAuthGuard)
export class VideosResolver implements OnModuleInit {
    constructor(@Inject(VIDEOS_MICROCERVICE) private readonly videosClient: ClientKafka) {}

    async onModuleInit() {
        this.videosClient.subscribeToResponseOf(UPLOAD_VIDEO_TOPIC);
        this.videosClient.subscribeToResponseOf(GET_VIDEO_TOPIC);
        this.videosClient.subscribeToResponseOf(LIKE_VIDEO_TOPIC);
        this.videosClient.subscribeToResponseOf(DISLIKE_VIDEO_TOPIC);
        await this.videosClient.connect();
    }

    @Mutation(() => PresignedUrl)
    createVideo(@Args('createVideoData') createVideoData: CreateVideoInput) {
        return this.videosClient.send(UPLOAD_VIDEO_TOPIC, { message: createVideoData });
    }

    @Query(() => Video)
    getVideo(@Args() getVideoArgs: GetVideoArgs) {
        return this.videosClient.send(GET_VIDEO_TOPIC, { message: getVideoArgs });
    }

    @Mutation(() => Like)
    like(@Args() likeVideoArgs: LikeVideoArgs) {
        return this.videosClient.send(LIKE_VIDEO_TOPIC, { message: likeVideoArgs });
    }

    @Mutation(() => Like)
    dislike(@Args() likeVideoArgs: LikeVideoArgs) {
        return this.videosClient.send(DISLIKE_VIDEO_TOPIC, { message: likeVideoArgs });
    }
}
