import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly authService: AuthenticationService
  ) { }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.validateTokenExpiration()) {
      return true;
    }

    return this.authService.refresh()
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['identity/sign-in']);
          return of(false);
        }),
      );
  }
}
