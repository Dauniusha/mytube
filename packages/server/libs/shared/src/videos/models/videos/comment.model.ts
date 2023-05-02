import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment {
    @Field()
    id: string;

    @Field()
    content: string;

    @Field()
    videoId: string;

    @Field()
    userId: string;

    @Field(() => Date)
    createdAt: Date;
}
