import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
    validators: [Validators.required, Validators.pattern(/[A-z0-9]{4,12}/)]
  });

  description = new FormControl('');

  constructor() {

  }

  createChannel(event: Event) {
    event.preventDefault();
    console.log(this.name, this.alias, this.description);
  }
}
