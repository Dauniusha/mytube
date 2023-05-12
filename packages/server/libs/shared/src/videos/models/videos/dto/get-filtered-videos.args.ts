import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { SortingDirections } from '@mytube/core/interfaces/sorting-directions.interface';

@InputType()
export class SortingFilterInput {
    @Field({ nullable: true })
    uploadedDate?: SortingDirections;

    @Field({ nullable: true })
    views?: SortingDirections;
}

@InputType()
export class GetFilteredVideosInput {
    @Field(() => SortingFilterInput)
    sortings: SortingFilterInput;

    @Field({ nullable: true })
    sentance?: string;

    @Field({ nullable: true })
    channel?: string;
}
