import { IYoutubeSearchResponseItem } from './youtube-response-item';

export interface IYoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYoutubeSearchResponseItem[];
}
