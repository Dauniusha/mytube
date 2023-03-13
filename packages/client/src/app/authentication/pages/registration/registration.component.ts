import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  constructor(
    private readonly registrationService: RegistrationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {}

  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value.'
      : 'Not a valid email.';
  }

  getPasswordErrorMessage() {
    return 'You must enter a value.';
  }

  signUp(event: Event) {
    event.preventDefault();

    this.registrationService
      .signUp({
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe(() => this.router.navigate(['']));
  }
}
