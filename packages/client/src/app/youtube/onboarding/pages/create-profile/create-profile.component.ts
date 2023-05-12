import { Country } from '@angular-material-extensions/select-country';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { convertBase64 } from '../../../../core/utils/base64-converter';
import { CreateProfileApi } from '../../api/create-profile.api';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss', '../../shared/styles.scss'],
})
export class CreateProfileComponent {
  firstName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/[A-z]{1,20}/)],
  });

  lastName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  username = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-z]{3,20}$/)],
  });

  country = new FormControl<Country>({
    name: 'Belarus',
    alpha2Code: 'BY',
    alpha3Code: 'BLR',
    numericCode: '375',
    callingCode: '375',
  }, { nonNullable: true, validators: [Validators.required] });

  avatarUrlSubject = new BehaviorSubject<string | null>(null);

  avatar: string | null = null;

  constructor(
    private readonly createProfileApi: CreateProfileApi,
    private readonly authSertvice: AuthenticationService,
    private readonly router: Router,
  ) {
    this.avatarUrlSubject
      .subscribe((value) => this.avatar = value);
  }

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];
    console.log(file)

    const base64 = await convertBase64(file);

    this.avatarUrlSubject.next(base64);
  }

  createProfile(event: Event) {
    event.preventDefault();
    console.log(this.avatar);
    this.createProfileApi.createProfile({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      avatar: this.avatar,
    }).subscribe(() => {
      this.authSertvice.nextOnboardingStep();
      this.router.navigate(['onboarding/channel']);
    });
  }
}
