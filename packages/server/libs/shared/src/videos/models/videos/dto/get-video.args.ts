import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class GetVideoArgs {
    @Field()
    @IsUUID()
        id: string;
}
