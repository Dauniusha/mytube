import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, map, merge, mergeMap, of, tap } from 'rxjs';
import { ChannelsApi } from '../../../core/services/api/channel.api';
import { ProfileApi } from '../../../core/services/api/profile.api';
import { MyChannelService } from '../../../core/services/channel.service';
import { LoadingService } from '../../../core/services/loader/loading.service';
import { MyProfileService } from '../../../core/services/profile.service';
import { convertBase64 } from '../../../core/utils/base64-converter';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss', '../shared/styles.scss']
})
export class ChannelComponent implements OnInit {
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });

  alias = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-z0-9\-]{4,12}$/)]
  });

  description = new FormControl('');

  channelForm = new FormGroup({
    name: this.name,
    description: this.description,
    alias: this.alias,
  });

  avatarUrlSubject = new BehaviorSubject<string | null>(null);

  isOwner = new BehaviorSubject<boolean>(false);

  username: string | null = null;

  constructor(
    readonly loadingService: LoadingService,
    private readonly myProfileService: MyProfileService,
    private readonly channelsApi: ChannelsApi,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly profileApi: ProfileApi,
  ) {}

  ngOnInit(): void {
    const { alias } = this.activatedRoute.snapshot.params;

    this.loadingService.loading();

    this.channelsApi.getChannel(undefined, alias)
      .pipe(
        mergeMap((channel) => this.myProfileService.myProfile$.pipe(
          map(({ getMyProfile: myProfile }) => ({
            ...channel,
            isOwner: channel.owner === myProfile.email,
          })),
          catchError(() => of({
            ...channel,
            isOwner: false,
          })),
        )),
        mergeMap((channel) => this.profileApi.getProfile(channel.owner).pipe(
          map(({ getUserProfile: profile }) => ({
            ...channel,
            username: profile.username,
          })),
          catchError(() => of({
            ...channel,
            username: null,
          })),
        )),
      ).subscribe((channelData) => {
        this.name.setValue(channelData.name);
        this.alias.setValue(channelData.alias);
        this.description.setValue(channelData.description ?? '');
        this.avatarUrlSubject.next(channelData.avatar ?? null);
        this.isOwner.next(channelData.isOwner);
        this.username = channelData.username;

        this.loadingService.loaded();
      });
  }

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];

    const base64 = await convertBase64(file);

    this.avatarUrlSubject.next(base64);
  }

  editChannel(event: Event) {
    event.preventDefault();

    if (this.channelForm.invalid) {
      return;
    }
    
    this.avatarUrlSubject.subscribe((avatar) => {
      this.channelsApi.editChannel({
        alias: this.alias.value,
        name: this.name.value,
        description: this.description.value,
        avatar,
      }).subscribe((updatedChannel) => {
        const { alias } = this.activatedRoute.snapshot.params;

        if (updatedChannel?.alias && updatedChannel.alias !== alias) {
          const url = this.router
            .createUrlTree([updatedChannel.alias], { relativeTo: this.activatedRoute })
            .toString();
          this.location.go(url);
        }
      });
    });
  }
}
