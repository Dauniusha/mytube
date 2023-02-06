import { IThumbnail } from '../thumbnail';

export interface IYoutubeSearchResponseItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;

    thumbnails: {
      default: IThumbnail;
      medium: IThumbnail;
      high: IThumbnail;
    };

    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}
