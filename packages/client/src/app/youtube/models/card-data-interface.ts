import { ICardStatistics } from './card-statistics-interface';

export interface ICardData {
  id: string;
  title: string;
  description: string;
  date: Date;
  statistics?: ICardStatistics;
  imgLink?: string;
}
