import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { map, Subscription, switchMap } from 'rxjs';
import { ChannelsApi } from '../../../core/services/api/channels.api';
import { VideosApi } from '../../../core/services/api/videos.api';
import { LoadingService } from '../../../core/services/loader/loading.service';
import { MyProfileService } from '../../../core/services/profile.service';
import { SharedModule } from '../../../shared/shared.module';
import { ICardStatistics } from '../../models/card-statistics-interface';
import { MatInputModule } from '@angular/material/input';

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
    statistics: ICardStatistics;
    createdAt: Date;
    description?: string;
  } = {
    id: '',
    name: '',
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
  } = {
    username: '',
  };

  comments: {
    avatar?: string;
    username: string;
    createdAt: Date;
    content: string;
  }[] = [{
    username: 'test',
    createdAt: new Date(),
    content: 'Soooo cool doomer music mix!! glra hfoljdhsblgkjhsdlfkjghs;dlkfjg hsp;idfjkghslkj;;k lsdfglksdfhglksjdfhgslkjdfhglskdjfhgsdlkfjh'
  }, {
    username: 'test',
    createdAt: new Date(),
    content: 'Soooo cool doomer music mix!! glra hfoljdhsblgkjhsdlfkjghs;dlkfjg hsp;idfjkghslkj;;k lsdfglksdfhglksjdfhgslkjdfhglskdjfhgsdlkfjh'
  }];

  myComment = new FormControl<string | null>(null, {
    validators: [Validators.maxLength(500)],
  });


  constructor(
    private readonly videosApi: VideosApi,
    private readonly channelsApi: ChannelsApi,
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
      )
      .subscribe(({ video, channel }) => {
        this.video = {
          id: video.id,
          name: video.name,
          createdAt: video.createdAt,
          statistics: {
            dislikeCount: video.dislikes.toString(),
            likeCount: video.likes.toString(),
            viewCount: video.views.toString(),
            commentCount: this.comments.length.toString(),
          },
          description: video.description ?? undefined,
        };
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
        };
      });
    this.subscriptions.push(myProfileSubscription);
  }

  addComment() {
    if (!this.myComment.value) {
      return;
    }

    const creationDate = new Date();

    this.comments.push({
      avatar: this.profile.avatar,
      content: this.myComment.value,
      createdAt: creationDate,
      username: this.profile.username,
    });

    this.myComment.setValue(null);
  }

  like() {

  }

  dislike() {

  }

  subscribe() {
    
  }
}
