import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { convertBase64 } from '../../../../core/utils/base64-converter';
import { CreateChannelGQL } from '../../../../graphql/types.generated';
import { CreateChannelApi } from '../../api/create-channel.api';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss', '../../shared/styles.scss']
})
export class CreateChannelComponent {
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });

  alias = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-z0-9\-]{4,12}$/)]
  });

  description = new FormControl('');

  avatarUrlSubject = new BehaviorSubject<string | null>(null);

  avatar: string | null = null;

  constructor(
    private readonly createChannelApi: CreateChannelApi,
    private readonly authSertvice: AuthenticationService,
    private readonly router: Router,
  ) {
    this.avatarUrlSubject
      .subscribe((value) => this.avatar = value);
  }

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];

    const base64 = await convertBase64(file);

    this.avatarUrlSubject.next(base64);
  }

  createChannel(event: Event) {
    event.preventDefault();
    this.createChannelApi.createChannel({
      name: this.name.value,
      alias: this.alias.value,
      description: this.description.value,
      avatar: this.avatar,
    }).subscribe(() => {
      this.authSertvice.nextOnboardingStep();
      this.router.navigate(['']);
    });
  }
}
