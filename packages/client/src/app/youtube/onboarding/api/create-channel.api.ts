import { Injectable } from "@angular/core";
import { CreateChannelGQL, CreateChannelInput } from "../../../graphql/types.generated";

@Injectable()
export class CreateChannelApi {
    constructor(private readonly createChannelGql: CreateChannelGQL) {}

    createChannel(createChannelData: CreateChannelInput) {
        return this.createChannelGql.mutate({ createChannelData });
    }
}
