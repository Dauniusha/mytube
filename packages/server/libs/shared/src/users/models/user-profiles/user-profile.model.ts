import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserProfile {
    @Field()
    email: string;

    @Field()
    lastName: string;

    @Field()
    firstName: string;

    @Field()
    username: string;

    @Field()
    avatar?: string;

    constructor(
        email: string,
        firstName: string,
        lastName: string,
        username: string,
        avatar?: string,
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.avatar = avatar;
    }
}
