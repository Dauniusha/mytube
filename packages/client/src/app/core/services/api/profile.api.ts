import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EditProfileGQL, EditUserProfileInput, GetMyProfileGQL, GetMyProfileQuery, GetProfileGQL, GetProfileQuery } from "../../../graphql/types.generated";

@Injectable({
  providedIn: 'root'
})
export class ProfileApi {
  constructor(
    private readonly getProfileGql: GetProfileGQL,
    private readonly getMyProfileGql: GetMyProfileGQL,
    private readonly editProfileGql: EditProfileGQL,
  ) {}

  getProfile(userId?: string, username?: string): Observable<GetProfileQuery> {
    console.log({ userId, username })
    return this.getProfileGql.fetch({ userId, username })
      .pipe(map((data) => data.data));
  }

  getMyProfile(): Observable<GetMyProfileQuery> {
    return this.getMyProfileGql.fetch()
      .pipe(map((data) => data.data));
  }

  editProfile(profileData: EditUserProfileInput) {
    return this.editProfileGql.mutate({ editProfileData: profileData })
      .pipe(map((data) => data.data));
  }
}
