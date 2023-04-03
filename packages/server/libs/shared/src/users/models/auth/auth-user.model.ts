import { Field, Int, ObjectType } from "@nestjs/graphql";

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

    @Field(() => Int)
    onboardingStep: number;

    constructor(email: string, createdAt: Date, updatedAt: Date, lastSignIn: Date, onboardingStep: number) {
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastSignIn = lastSignIn;
        this.onboardingStep = onboardingStep;
    }
}
