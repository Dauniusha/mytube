import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private name: string = '';

  public isLogin: Observable<boolean> = this.authService.loginState$;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  public ngOnInit(): void {
  }
}
