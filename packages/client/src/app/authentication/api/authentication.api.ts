import { HttpContext } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { IS_NEED_AUTHORISATION } from '../../core/http/auth-context-token.model';
import { RefreshGQL, SignInGQL, SignOutGQL } from '../../graphql/types.generated';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  constructor(
    private readonly injector: Injector,
  ) {}

  signIn(email: string, password: string) {
    const signInMutation = this.injector.get(SignInGQL);

    return signInMutation.mutate({
      email,
      password, 
    }, {
      context: new HttpContext().set(IS_NEED_AUTHORISATION, false),
    });
  }

  signOut() {
    const signOutMutation = this.injector.get(SignOutGQL);

    return signOutMutation.mutate();
  }

  refresh(refreshToken: string) {
    const refreshMutation = this.injector.get(RefreshGQL);

    return refreshMutation.mutate({
      refreshToken,
    }, {
      context: new HttpContext().set(IS_NEED_AUTHORISATION, false),
    });
  }
}
