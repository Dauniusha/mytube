import { Pipe, PipeTransform } from '@angular/core';
import { CardData as ICardData } from '../models/card-data.interface';

@Pipe({
  name: 'filterByWord',
})
export class FilterByWordPipe implements PipeTransform {
  public transform(value: ICardData[] | null, query: string): ICardData[] {
    if (!value) {
      return [];
    }

    if (!query) {
      return value;
    }

    query = query.toLowerCase();

    return value.filter((card) => card.title.toLowerCase().includes(query));
  }
}
