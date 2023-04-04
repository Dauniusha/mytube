import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Channel {
    @Field()
    id: string;

    @Field()
    owner: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field(() => Date)
    createdAt: Date;

    constructor(
        id: string,
        owner: string,
        name: string,
        createdAt: Date,
        description?: string,
        avatar?: string,
    ) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.createdAt = createdAt;
        this.description = description;
        this.avatar = avatar;
    }
}
