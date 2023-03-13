import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { selectorUser } from '../../../../redux/selectors/user.selectors';
import { AppState } from '../../../../redux/state.models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public isLoggedIn: Observable<boolean> = this.store.select(selectorUser.loginState);

  constructor(
    public readonly router: Router,
    private readonly store: Store<AppState>,
    public readonly authService: AuthenticationService,
  ) { }

  goToLogin() {
    this.router.navigate(['identity/sign-in']);
  }

  signOut() {
    this.authService.signOut()
      .subscribe(() => this.router.navigate(['']));
  }

  public ngOnInit(): void {
  }
}
