import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { IInputEmit } from '../../models/input-emit-interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() name: string = '';

  @Input() type: string = '';

  @Output() valueChange: EventEmitter<IInputEmit> = new EventEmitter<IInputEmit>();

  constructor() { }

  public ngOnInit(): void {
  }

  public emitChanges(event: Event) {
    this.valueChange.emit({ key: this.name, value: (<HTMLInputElement>event.target).value });
  }
}
