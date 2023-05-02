import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
    @Field()
    @IsString()
    @MaxLength(500)
        content: string;

    @Field()
    @IsEmail()
        userId: string;

    @Field()
    @IsUUID()
        videoId: string;
}
