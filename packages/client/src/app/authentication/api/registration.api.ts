import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IS_NEED_AUTHORISATION } from '../../core/http/auth-context-token.model';
import { CreateUserInput, SignUpGQL } from '../../graphql/types.generated';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApi {
  constructor(
    private readonly signUpGql: SignUpGQL,
  ) {}

  signUp(createUserData: CreateUserInput) {
    return this.signUpGql.mutate({
      signUpData: createUserData
    }, {
      context: new HttpContext().set(IS_NEED_AUTHORISATION, false),
    });
  }
}
