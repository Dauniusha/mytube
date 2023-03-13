import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';

  password: string = '';

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
  ) { }

  signIn(event: Event) {
    event.preventDefault();

    this.authService.signIn(this.email, this.password)
      .subscribe(() => this.router.navigate(['']));
  }

  public ngOnInit(): void {
  }
}
