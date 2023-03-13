import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { CreateUserInput } from '../../graphql/types.generated';
import { RegistrationApi } from '../api/registration.api';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private readonly registrationApi: RegistrationApi,
    private readonly authService: AuthenticationService,
  ) {}

  signUp(createUserInput: CreateUserInput) {
    return this.registrationApi.signUp(createUserInput)
      .pipe(tap(({ data }) => this.authService.clientSignIn(data!.signUp)));
  }
}
