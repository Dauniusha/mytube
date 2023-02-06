import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    private router: Router,
  ) {
    this.loginService.loginState$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigate(['']);
      }
    });
  }

  public ngOnInit(): void {
  }
}
