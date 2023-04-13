import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class EditUserProfileInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        lastName?: string;
    
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        username?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
        avatar?: string;
}
