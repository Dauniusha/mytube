import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { AuthenticationApi } from '../../authentication/api/authentication.api';
import { GetMyProfileQuery } from '../../graphql/types.generated';
import { ProfileApi } from './api/profile.api';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  readonly myProfile$: ReplaySubject<GetMyProfileQuery> = new ReplaySubject(1);

  constructor(
    private readonly profileApi: ProfileApi,
    private readonly usersApi: AuthenticationApi,
  ) {
    this.profileApi
      .getMyProfile()
      .subscribe((data) => this.myProfile$.next(data));
  }
}
