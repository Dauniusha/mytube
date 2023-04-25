import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateVideoInput {
    @Field()
    @IsString()
    @MinLength(10)
    @MaxLength(60)
        name: string;

    @Field()
    @IsString()
        preview: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(300)
        description?: string;

    @Field()
    @IsUUID()
        chanelId: string;
}
