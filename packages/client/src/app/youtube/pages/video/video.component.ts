import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, map, of, Subscription, switchMap } from 'rxjs';
import { ChannelsApi } from '../../../core/services/api/channels.api';
import { VideosApi } from '../../../core/services/api/videos.api';
import { LoadingService } from '../../../core/services/loader/loading.service';
import { MyProfileService } from '../../../core/services/profile.service';
import { SharedModule } from '../../../shared/shared.module';
import { ICardStatistics } from '../../models/card-statistics-interface';
import { MatInputModule } from '@angular/material/input';
import { ProfileApi } from '../../../core/services/api/profile.api';
import { CommentsApi } from '../../../core/services/api/comments.api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MatInputModule,
  ],
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {
  readonly videoStreamingApiUrl = 'http://localhost:3000/videos';

  private subscriptions: Subscription[] = [];

  channel: {
    avatar?: string;
    name: string;
    subscribers: number;
    alias: string;
  } = {
    alias: '',
    name: '',
    subscribers: 0,
  };

  video: {
    id: string;
    name: string;
    liked: boolean;
    unliked: boolean;
    statistics: ICardStatistics;
    createdAt: Date;
    description?: string;
  } = {
    id: '',
    name: '',
    liked: false,
    unliked: false,

    statistics: {
      dislikeCount: '0',
      likeCount: '0',
      viewCount: '0',
      commentCount: '0',
    },
    createdAt: new Date(),
  };

  profile: {
    avatar?: string;
    username: string;
    userId: string;
  } = {
    username: '',
    userId: '',
  };

  comments: {
    avatar?: string;
    username: string;
    createdAt: Date;
    content: string;
  }[] = [];

  myComment = new FormControl<string | null>(null, {
    validators: [Validators.maxLength(500)],
  });


  constructor(
    private readonly videosApi: VideosApi,
    private readonly channelsApi: ChannelsApi,
    private readonly profilesApi: ProfileApi,
    private readonly commentsApi: CommentsApi,
    private readonly myProfileService: MyProfileService,
    private readonly activatedRoute: ActivatedRoute,
    readonly loadingService: LoadingService,
    readonly location: Location,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  ngOnInit(): void {
    const { videoId } = this.activatedRoute.snapshot.params;

    const getVideoSubscription = this.videosApi.getVideo(videoId)
      .pipe(
        switchMap(({ getVideo: video }) => this.channelsApi.getChannel(
          undefined,
          undefined,
          video.channelId,
        ).pipe(map((channel) => ({
          video,
          channel,
        })))),
        switchMap((res) => this.profilesApi
          .getProfiles(res.video.comments.map((x) => x.userId))
          .pipe(map(({ getUserProfiles: profiles }) => {
            const profilesMap = profiles
              .reduce(
                (acc, x) => acc.set(x.email, x),
                new Map<string, typeof profiles[0]>(),
              );

            return {
              ...res,
              profilesMap,
            };
          }))),
      )
      .subscribe(({ video, channel, profilesMap }) => {
        this.video = {
          id: video.id,
          name: video.name,
          liked: false, // TODO: store user likes
          unliked: false, // TODO: store user dislikes
          createdAt: video.createdAt,
          statistics: {
            dislikeCount: video.dislikes.toString(),
            likeCount: video.likes.toString(),
            viewCount: video.views.toString(),
            commentCount: video.comments.length.toString(),
          },
          description: video.description ?? undefined,
        };

        this.comments = video.comments.map((x) => {
          const profile = profilesMap.get(x.userId);

          if (!profile) {
            return {
              content: x.content,
              createdAt: new Date(x.createdAt),
              username: 'Unknown',
            };
          }

          return {
            content: x.content,
            createdAt: new Date(x.createdAt),
            username: profile.username,
            avatar: profile.avatar ?? undefined,
          };
        });

        this.channel = {
          avatar: channel.avatar ?? undefined,
          name: channel.name,
          subscribers: 0,
          alias: channel.alias,
        };
      });

    this.subscriptions.push(getVideoSubscription);

    const myProfileSubscription = this.myProfileService.myProfile$
      .subscribe(({ getMyProfile: myProfile }) => {
        this.profile = {
          avatar: myProfile.avatar ?? undefined,
          username: myProfile.username,
          userId: myProfile.email,
        };
      });
    this.subscriptions.push(myProfileSubscription);
  }

  addComment() {
    if (!this.myComment.value) {
      return;
    }

    const creationDate = new Date();
    const content = this.myComment.value;

    this.comments.push({
      avatar: this.profile.avatar,
      content,
      createdAt: creationDate,
      username: this.profile.username,
    });
    this.video.statistics.commentCount = (Number(this.video.statistics.commentCount) + 1).toString();

    this.myComment.setValue(null);

    this.commentsApi.create({
      content,
      userId: this.profile.userId,
      videoId: this.video.id,
    })
    .pipe(catchError(() => of(this.comments.pop())))
    .subscribe();
  }

  like() {
    if (this.video.liked === true) {
      return;
    }

    this.video.liked = true;
    this.video.statistics.likeCount = (Number(this.video.statistics.likeCount) + 1).toString();

    this.videosApi.like(this.video.id)
      .subscribe();
  }

  dislike() {
    if (this.video.unliked === true) {
      return;
    }

    this.video.unliked = true;
    this.video.statistics.dislikeCount = (Number(this.video.statistics.dislikeCount) + 1).toString();

    this.videosApi.dislike(this.video.id)
      .subscribe();
  }

  subscribe() {

  }
}
