import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { setting } from 'src/app/settings/setting';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginState: BehaviorSubject<boolean>;

  public loginState$: Observable<boolean>;

  constructor(
    private router: Router,
  ) {
    const initialState = !!localStorage.getItem(setting.stringConstants.storeNames.token);

    this.loginState = new BehaviorSubject(initialState);
    this.loginState$ = this.loginState.asObservable();
  }

  public login(event: Event) {
    event.preventDefault();
    const token = LoginService.getToken();

    localStorage.setItem(setting.stringConstants.storeNames.token, token);
    this.loginState.next(true);
    this.router.navigate(['']);
  }

  public logout() {
    localStorage.removeItem(setting.stringConstants.storeNames.token);
    this.loginState.next(false);
    this.goToLogin();
  }

  public goToLogin() {
    this.router.navigate(['login']);
  }

  private static getToken(): string {
    return Math.random().toString(16);
  }
}
