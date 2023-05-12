import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { CardData } from '../../models/card-data.interface';
import { CardProto } from '../../models/card-proto';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MiniCardComponent extends CardProto<CardData> implements OnInit {

  public previewLink: string = '';

  @Input() set cardData(data: CardData) {
    this.data = data;
    this.date = data.date;
    this.previewLink = data.imgLink;
  }

  constructor() {
    super();
  }

  public ngOnInit(): void {
  }

  public get cardData() {
    if (this.data) {
      return this.data;
    }
    throw Error('Data does not exist!');
  }
}
