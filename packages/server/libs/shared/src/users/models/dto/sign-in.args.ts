import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SignInArgs {
    @Field()
    @IsEmail()
        email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
        password: string;
}
