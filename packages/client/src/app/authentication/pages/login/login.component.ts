import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.authService.loginState$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigate(['']);
      }
    });
  }

  public ngOnInit(): void {
  }
}
