import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

@InputType()
export class EditChannelInput {
    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
        name?: string;

    @Field()
    @IsString()
    @Matches(/^[A-z0-9\-]{4,12}$/, {
        message: 'Must be 4-12 length with letters or digits and -',
    })
        alias?: string;

    @Field({ nullable: true })
    @IsString()
    @MaxLength(300)
        description?: string;
    
    @Field({ nullable: true })
    @IsString()
    @MaxLength(255)
        avatar?: string;
}
