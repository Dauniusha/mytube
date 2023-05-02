import { Injectable } from "@nestjs/common";
import { Comment } from "../../../prisma/generated";
import { PrismaService } from "../../core/prisma/prisma.service";

@Injectable()
export class CommentsRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    create(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
        return this.prismaService.client.comment.create({
            data: comment,
        });
    }
}
