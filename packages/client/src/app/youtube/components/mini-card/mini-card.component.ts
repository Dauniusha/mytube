import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { setting } from 'src/app/settings/setting';
import { ICardData } from '../../models/card-data-interface';
import { CardProto } from '../../models/card-proto';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MiniCardComponent extends CardProto<ICardData> implements OnInit {
  public videoLink: string = '';

  public previewLink: string = '';

  @Input() set cardData(data: ICardData) {
    this.data = data;

    this.date = data.date;

    this.videoLink = setting.urlConstants.videoLink + data.id;
    this.previewLink = setting.urlConstants.previewLink + data.id + setting.urlConstants.previewQuality.medium;
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
