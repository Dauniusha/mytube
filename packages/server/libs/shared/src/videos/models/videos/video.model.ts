import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "./comment.model";

@ObjectType()
export class Video {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    channelId: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    preview: string;

    @Field(() => Int)
    likes: number;

    @Field(() => Int)
    views: number;

    @Field(() => Int)
    dislikes: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => [Comment])
    comments: Comment[];

    @Field(() => Int)
    commentsAmount: number;

    constructor(
        id: string,
        name: string,
        channelId: string,
        preview: string,
        likes: number,
        views: number,
        dislikes: number,
        createdAt: Date,
        comments: Comment[],
        description?: string,
    ) {
        this.id = id;
        this.name = name;
        this.channelId = channelId;
        this.preview = preview;
        this.likes = likes;
        this.views = views;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.comments = comments;
        this.description = description;
        this.commentsAmount = comments.length;
    }
}
