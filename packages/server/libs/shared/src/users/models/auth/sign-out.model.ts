import { Field, ObjectType } from "@nestjs/graphql";
import { Void } from "../../../core/scalars/void.scalar";

@ObjectType()
export class SignOut {
    @Field(() => Void, { nullable: true })
    data: null;
}
