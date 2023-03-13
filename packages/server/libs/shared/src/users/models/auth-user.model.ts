import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthUser {
    @Field()
    email: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Date)
    lastSignIn: Date;

    constructor(email: string, createdAt: Date, updatedAt: Date, lastSignIn: Date) {
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastSignIn = lastSignIn;
    }
}
