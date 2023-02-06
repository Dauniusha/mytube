import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/authentication/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private name: string = '';

  public isLogin: Observable<boolean> = this.loginService.loginState$;

  constructor(
    public loginService: LoginService,
    public router: Router,
  ) { }

  public ngOnInit(): void {
  }
}
