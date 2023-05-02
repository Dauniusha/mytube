import { Field, ObjectType } from "@nestjs/graphql";
import { Void } from "../../../core/scalars/void.scalar";

@ObjectType()
export class Like {
    @Field(() => Void, { nullable: true })
    data: null;
}
