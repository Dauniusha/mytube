import {
    Inject, OnModuleInit, UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { VIDEOS_MICROCERVICE } from '@mytube/infrastructure';
import { JwtAuthGuard } from '../../core/auth';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ADD_COMMENT_TOPIC } from '@mytube/shared/videos/constants';
import { Comment, CreateCommentInput } from '@mytube/shared/videos/models/videos';

@Resolver(() => Comment)
@UseGuards(JwtAuthGuard)
export class CommentsResolver implements OnModuleInit {
    constructor(@Inject(VIDEOS_MICROCERVICE) private readonly videosClient: ClientKafka) {}

    async onModuleInit() {
        this.videosClient.subscribeToResponseOf(ADD_COMMENT_TOPIC);
        await this.videosClient.connect();
    }

    @Mutation(() => Comment)
    createComment(@Args('createCommentData') createCommentData: CreateCommentInput) {
        return this.videosClient.send(ADD_COMMENT_TOPIC, { message: createCommentData });
    }
}
