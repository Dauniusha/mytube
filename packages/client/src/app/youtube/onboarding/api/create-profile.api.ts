import { Injectable } from "@angular/core";
import { CreateProfileGQL, CreateUserProfileInput } from "../../../graphql/types.generated";

@Injectable()
export class CreateProfileApi {
    constructor(private readonly createProfileGql: CreateProfileGQL) {}

    createProfile(createProfileData: CreateUserProfileInput) {
        return this.createProfileGql.mutate({ createProfileData });
    }
}
