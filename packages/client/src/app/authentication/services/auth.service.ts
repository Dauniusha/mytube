import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { setting } from 'src/app/settings/setting';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginState: BehaviorSubject<boolean>;

  loginState$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
  ) {
    const initialState = !!localStorage.getItem(setting.stringConstants.storeNames.token);

    this.loginState = new BehaviorSubject(initialState);
    this.loginState$ = this.loginState.asObservable();
  }

  async login(event: Event) {
    event.preventDefault();

    localStorage.setItem(setting.stringConstants.storeNames.token, token);
    this.loginState.next(true);
    this.router.navigate(['']);
  }

  logout() {
    localStorage.removeItem(setting.stringConstants.storeNames.token);
    this.loginState.next(false);
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
