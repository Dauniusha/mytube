import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CreateVideoGQL, CreateVideoInput, CreateVideoMutation, DislikeGQL, GetFilteredVideosGQL, GetFilteredVideosInput, GetVideoGQL, GetVideoQuery, LikeGQL } from "../../../graphql/types.generated";

@Injectable({
  providedIn: 'root'
})
export class VideosApi {
  constructor(
    private readonly getVideoGql: GetVideoGQL,
    private readonly createVideoGql: CreateVideoGQL,
    private readonly likeGql: LikeGQL,
    private readonly dislikeGql: DislikeGQL,
    private readonly getFilteredVideosApi: GetFilteredVideosGQL,
  ) {}

  getVideo(videoId: string): Observable<GetVideoQuery> {
    return this.getVideoGql.fetch({ videoId })
      .pipe(map((response) => response.data));
  }

  createVideo(createVideoData: CreateVideoInput) {
    return this.createVideoGql.mutate({ createVideoData })
      .pipe(map((response) => response.data));
  }

  like(videoId: string) {
    return this.likeGql.mutate({ videoId })
      .pipe(map((res) => res.data));
  }

  dislike(videoId: string) {
    return this.dislikeGql.mutate({ videoId })
      .pipe(map((res) => res.data));
  }

  getFiltered(filter: GetFilteredVideosInput) {
    return this.getFilteredVideosApi.fetch({ videoFilterData: filter })
      .pipe(map((data) => data.data));
  }
}
