import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class EditUserProfileInput {
    @Field({ nullable: true })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        lastName?: string;
    
    @Field({ nullable: true })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        firstName?: string;

    @Field({ nullable: true })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        username?: string;

    @Field({ nullable: true })
    @IsString()
        avatar?: string;
}
