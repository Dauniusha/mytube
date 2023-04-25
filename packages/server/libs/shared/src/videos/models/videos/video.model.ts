import { Field, Int, ObjectType } from "@nestjs/graphql";

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

    constructor(
        id: string,
        name: string,
        channelId: string,
        preview: string,
        likes: number,
        views: number,
        dislikes: number,
        createdAt: Date,
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
        this.description = description;
    }
}
