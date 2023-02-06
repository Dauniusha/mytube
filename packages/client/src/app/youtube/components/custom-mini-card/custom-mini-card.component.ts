import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';
import { CardProto } from '../../models/card-proto';

@Component({
  selector: 'app-custom-mini-card',
  templateUrl: './custom-mini-card.component.html',
  styleUrls: ['./custom-mini-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomMiniCardComponent extends CardProto<ICustomCardData> implements OnInit {
  public id: string = '';

  @Input() set cardData(data: ICustomCardData) {
    this.data = data;
    this.date = data.date;

    this.id = this.data.inputData.videoLink.slice(32, 43);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
