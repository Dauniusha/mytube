import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { GetMyChannelQuery } from '../../graphql/types.generated';
import { ChannelsApi } from './api/channels.api';

@Injectable({
  providedIn: 'root',
})
export class MyChannelService {
  readonly myChannel$: ReplaySubject<GetMyChannelQuery> = new ReplaySubject(1);

  constructor(private readonly channelsApi: ChannelsApi) {
    this.channelsApi
      .getMyChannel()
      .subscribe((data) => this.myChannel$.next(data));
  }
}
