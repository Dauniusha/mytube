import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

@ArgsType()
export class GetUserProfileArgs {
    @Field({  nullable: true })
    @IsOptional()
    @IsString()
    @Matches(/^[A-z0-9\-]{4,12}$/, {
        message: 'Must be 4-12 length with letters or digits',
    })
        username?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
        userId?: string;
}
