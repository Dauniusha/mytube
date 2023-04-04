import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class EditChannelInput {
    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
        name?: string;

    @Field({ nullable: true })
    @IsString()
    @MaxLength(300)
        description?: string;
    
    @Field({ nullable: true })
    @IsString()
    @MaxLength(255)
        avatar?: string;
}
