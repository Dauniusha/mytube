import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GetFilteredVideosInput, GetFilteredVideosQuery } from '../../graphql/types.generated';
import { VideosApi } from './api/videos.api';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private videoFilter: GetFilteredVideosInput = { sortings: {} };
  readonly filteredVideos$: Subject<GetFilteredVideosQuery> = new Subject(); 

  constructor(private readonly videosApi: VideosApi) {
    this.videosApi
      .getFiltered({ sortings: {} })
      .subscribe((data) => this.filteredVideos$.next(data));
  }

  setFilter(filter: Partial<GetFilteredVideosInput> = {}) {
    this.videoFilter = {
      ...this.videoFilter,
      ...filter,
    };

    this.videosApi  
      .getFiltered(this.videoFilter)
      .subscribe((data) => this.filteredVideos$.next(data));
  }
}
