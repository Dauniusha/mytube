import { IThumbnail } from '../thumbnail';

export interface IYoutubeVideoResponseItem {
  kind: string;
  etag: string;
  id: string;

  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;

    thumbnails: {
      default: IThumbnail;
      medium: IThumbnail;
      high: IThumbnail;
      standard: IThumbnail;
      maxres: IThumbnail;
    };

    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };

  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}
