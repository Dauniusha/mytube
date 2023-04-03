import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserProfileInput {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        lastName: string;
    
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        firstName: string;

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
        username: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
        avatar?: string;
}
