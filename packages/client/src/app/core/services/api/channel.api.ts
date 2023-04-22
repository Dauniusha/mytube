import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { EditChannelGQL, EditChannelInput, GetChannelGQL, GetChannelsGQL, GetMyChannelGQL, } from "../../../graphql/types.generated";

@Injectable({
  providedIn: 'root'
})
export class ChannelsApi {
  constructor(
    private readonly getMyChannelGql: GetMyChannelGQL,
    private readonly getChannelGql: GetChannelGQL,
    private readonly getChannelsGql: GetChannelsGQL,
    private readonly editChannelGql: EditChannelGQL,
  ) {}

  getChannel(ownerId?: string, alias?: string) {
    return this.getChannelGql.fetch({ ownerId, alias })
      .pipe(map((data) => data.data.getChannel));
  }

  getMyChannel() {
    return this.getMyChannelGql.fetch()
      .pipe(map((data) => data.data));
  }

  getChannels() {
    return this.getChannelsGql.fetch()
      .pipe(map((data) => data.data.getChannels));
  }

  editChannel(channelData: EditChannelInput) {
    return this.editChannelGql.mutate({ editChannelData: channelData })
      .pipe(map((data) => data.data?.editChannel));
  }
}
