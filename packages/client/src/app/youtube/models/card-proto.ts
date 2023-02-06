import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';
import { ICardData } from './card-data-interface';

export abstract class CardProto<T extends ICardData | ICustomCardData> {
  public date: Date = new Date();

  public data?: T;

  constructor() { }
}
