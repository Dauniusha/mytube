import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class EditUserProfileInput {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        lastName?: string;
    
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        firstName?: string;

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        username?: string;

    @Field()
    @IsString()
        avatar?: string;
}
