import { Injectable } from "@nestjs/common";
import { CreateCommentInput } from "@mytube/shared/videos/models/videos";
import { CommentsRepository } from "./repositories/comments.repository";

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    create(commentDto: CreateCommentInput) {
        return this.commentsRepository.create(commentDto);
    }
}
