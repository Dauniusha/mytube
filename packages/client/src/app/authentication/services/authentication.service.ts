import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, tap } from 'rxjs/operators';
import { setting } from 'src/app/settings/setting';
import { userActionsMap } from '../../redux/actions/user.actions';
import { AppState } from '../../redux/state.models';
import { AuthenticationApi } from '../api/authentication.api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResult } from '../../graphql/types.generated';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly authApi: AuthenticationApi,
    private readonly jwtHelperService: JwtHelperService,
  ) {
    const isAuthenticated = !!localStorage.getItem(setting.stringConstants.storeNames.token);

    this.store.dispatch(userActionsMap.authenticate({ isAuthenticated }));
  }

  getAccessToken() {
    return localStorage.getItem(setting.stringConstants.storeNames.token);
  }

  clientSignIn(authResult: AuthResult) {
    const { accessToken, refreshToken, onboardingStep } = authResult;

    localStorage.setItem(setting.stringConstants.storeNames.token, accessToken);
    localStorage.setItem(setting.stringConstants.storeNames.refreshToken, refreshToken);
    localStorage.setItem(setting.stringConstants.storeNames.onboardingStep, onboardingStep.toString());

    this.store.dispatch(userActionsMap.authenticate({ isAuthenticated: true }));
  }

  clientSignOut() {
    localStorage.removeItem(setting.stringConstants.storeNames.token);
    localStorage.removeItem(setting.stringConstants.storeNames.refreshToken);
    localStorage.removeItem(setting.stringConstants.storeNames.onboardingStep);

    this.store.dispatch(userActionsMap.authenticate({ isAuthenticated: false }));
  }

  signIn(email: string, password: string) {
    return this.authApi.signIn(email, password)
      .pipe(tap(({ data }) => this.clientSignIn(data!.signIn)));
  }

  signOut() {
    return this.authApi.signOut()
      .pipe(tap(() => this.clientSignOut()));
  }

  refresh(): Observable<void> {
    const refreshToken = localStorage.getItem(setting.stringConstants.storeNames.refreshToken);

    if (!refreshToken) {
      this.clientSignOut();
      return throwError(() => new Error('Refresh token not found.'));
    }

    return this.authApi.refresh(refreshToken)
      .pipe(
        map(({ data }) => this.clientSignIn(data!.refresh)),
        catchError((err) => {
          this.clientSignOut();
          throw err;
        }),
      );
  }

  validateTokenExpiration(): boolean {
    const token = localStorage.getItem(setting.stringConstants.storeNames.token);

    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

  nextOnboardingStep() {
    const nextStep = Number(setting.stringConstants.storeNames.onboardingStep) + 1;
    localStorage.setItem(setting.stringConstants.storeNames.onboardingStep, nextStep.toString());
  }
}
