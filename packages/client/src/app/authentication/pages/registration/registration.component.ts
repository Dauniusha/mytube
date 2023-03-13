import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SignUpGQL } from '../../../graphql/types.generated';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private readonly signUpGql: SignUpGQL) { }

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
    this.signUpGql
      .mutate({ signUpData: { email: this.email.value, password: this.password.value } })
      .subscribe();
  }
}
