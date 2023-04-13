import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../../core/services/loader/loading.service';
import { convertBase64 } from '../../../core/utils/base64-converter';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
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

  isOwner = new BehaviorSubject<boolean>(false);

  constructor(
    readonly loadingService: LoadingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];

    const base64 = await convertBase64(file);

    this.avatarUrlSubject.next(base64);
  }

  editChannel(event: Event) {
    event.preventDefault();
    
  }
}
