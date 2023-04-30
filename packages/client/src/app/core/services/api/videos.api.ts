import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CreateVideoGQL, CreateVideoInput, CreateVideoMutation, GetVideoGQL, GetVideoQuery } from "../../../graphql/types.generated";

@Injectable({
  providedIn: 'root'
})
export class VideosApi {
  constructor(
    private readonly getVideoGql: GetVideoGQL,
    private readonly createVideoGql: CreateVideoGQL,
  ) {}

  getVideo(videoId: string): Observable<GetVideoQuery> {
    return this.getVideoGql.fetch({ videoId })
      .pipe(map((response) => response.data));
  }

  createVideo(createVideoData: CreateVideoInput) {
    this.createVideoGql.mutate({ createVideoData })
        .pipe(map((response) => response.data));
  }
}
