import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { ITitleButtonDateData } from 'src/app/shared/models/title-button-date-data';

@Component({
  selector: 'app-title-button-date',
  templateUrl: './title-button-date.component.html',
  styleUrls: ['./title-button-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TitleButtonDateComponent implements OnInit {
  @Input() data: ITitleButtonDateData = {
    date: new Date(),
    title: '',
    id: '',
  };

  constructor() { }

  ngOnInit(): void {
  }
}
