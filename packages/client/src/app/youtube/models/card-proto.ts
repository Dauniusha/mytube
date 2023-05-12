import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';
import { CardData } from './card-data.interface';

export abstract class CardProto<T extends CardData | ICustomCardData> {
  public date: Date = new Date();

  public data?: T;

  constructor() { }
}
