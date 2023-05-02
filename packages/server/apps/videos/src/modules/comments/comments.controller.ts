import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CommentsService } from "./comments.service";
import { ADD_COMMENT_TOPIC } from "@mytube/shared/videos/constants";
import { Comment, CreateCommentInput } from "@mytube/shared/videos/models/videos";

@Controller()
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
    ) {}

    @MessagePattern(ADD_COMMENT_TOPIC)
    add(@Payload('message') data: CreateCommentInput): Promise<Comment> {
        return this.commentsService.create(data);
    }
}
