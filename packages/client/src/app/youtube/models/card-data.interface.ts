import { ICardStatistics } from './card-statistics-interface';

export interface CardData {
  id: string;
  title: string;
  date: Date;
  statistics?: ICardStatistics;
  imgLink: string;
}
