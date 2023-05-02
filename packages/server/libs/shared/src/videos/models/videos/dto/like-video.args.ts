import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class LikeVideoArgs {
    @Field()
    @IsUUID()
        videoId: string;
}
