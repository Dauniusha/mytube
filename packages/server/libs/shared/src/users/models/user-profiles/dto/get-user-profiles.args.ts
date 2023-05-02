import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsEmail } from 'class-validator';

@ArgsType()
export class GetUserProfilesArgs {

    @Field(() => [String])
    @IsArray()
    @IsEmail({}, { each: true })
        userIds: string[];
}
