import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PresignedUrl {
    @Field()
    url: string;

    constructor(url: string) {
        this.url = url;
    }
}
