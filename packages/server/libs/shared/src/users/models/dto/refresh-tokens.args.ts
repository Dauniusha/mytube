import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class RefreshTokensArgs {
    @Field()
    refreshToken: string;
}
