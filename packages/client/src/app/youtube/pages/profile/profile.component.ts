import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, map, mergeMap, of, ReplaySubject, tap } from 'rxjs';
import { ChannelsApi } from '../../../core/services/api/channels.api';
import { ProfileApi } from '../../../core/services/api/profile.api';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-z]{1,20}$/)],
  });

  lastName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  username = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-z]{3,20}$/)],
  });

  profileForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
  });

  avatarUrlSubject = new BehaviorSubject<string | null>(null);

  isOwner = new BehaviorSubject<boolean>(false);

  channelAlias: string | null = null;

  constructor(
    readonly loadingService: LoadingService,
    private readonly profileApi: ProfileApi,
    private readonly myProfileService: MyProfileService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly channelsApi: ChannelsApi
  ) {}

  private fillProfile(
    firstName: string,
    lastName: string,
    username: string,
    avatar: string | null = null,
  ) {
    this.firstName.setValue(firstName);
    this.lastName.setValue(lastName);
    this.username.setValue(username);
    this.avatarUrlSubject.next(avatar);
  }

  ngOnInit(): void {
    this.loadingService.loading();

    const { username } = this.activatedRoute.snapshot.params;

    this.profileApi.getProfile(undefined, username)
      .pipe(
        mergeMap(({ getUserProfile: profile }) => this.myProfileService.myProfile$.pipe(
          map(({ getMyProfile: myProfile }) => ({
            ...profile,
            isOwner: myProfile.username === profile.username,
          })),
          catchError(() => of({
            ...profile,
            isOwner: false,
          })),
        )),
        mergeMap((profile) => this.channelsApi.getChannel(profile.email).pipe(
          map(({ alias }) => ({
            ...profile,
            alias,
          })),
          catchError(() => of({
            ...profile,
            alias: null,
          })),
        )),
      ).subscribe((profile) => {
        this.fillProfile(
          profile.firstName,
          profile.lastName,
          profile.username,
          profile.avatar,
        );

        this.isOwner.next(profile.isOwner);
        this.channelAlias = profile.alias;

        this.loadingService.loaded();
      });
  }

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];

    const base64 = await convertBase64(file);

    this.avatarUrlSubject.next(base64);
  }

  editProfile(event: Event) {
    event.preventDefault();

    if (this.profileForm.invalid) {
      return;
    }

    this.avatarUrlSubject.subscribe((avatar) => {
      this.profileApi.editProfile({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        username: this.username.value,
        avatar,
      }).subscribe((profileData) => {
        const newUsername = profileData?.editUserProfile.username;
        const { username } = this.activatedRoute.snapshot.params;

        if (newUsername && newUsername !== username) {
          this.router.navigate([ 'profile', newUsername ]);
        }
      });
    });
  }
}
