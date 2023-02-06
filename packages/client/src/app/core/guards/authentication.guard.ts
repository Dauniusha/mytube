import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { setting } from '../../settings/setting';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(setting.stringConstants.storeNames.token)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
