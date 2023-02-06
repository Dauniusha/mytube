import { IYoutubeVideoResponseItem } from './response-item';

export interface IYoutubeVideoResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYoutubeVideoResponseItem[];
}
