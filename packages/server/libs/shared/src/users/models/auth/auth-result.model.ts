import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tokens } from "./tokens.model";

@ObjectType()
export class AuthResult implements Tokens {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(() => Int)
    onboardingStep: number;

    constructor(accessToken: string, refreshToken: string, onboardingStep: number) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.onboardingStep = onboardingStep;
    }
}
