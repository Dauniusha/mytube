import { Pipe, PipeTransform } from '@angular/core';
import { CardData as ICardData } from '../models/card-data.interface';

type SortType = 'asc' | 'desc' | '';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  public transform(value: ICardData[] | null, field?: string, type?: SortType): ICardData[] {
    if (!value) {
      return [];
    }

    if (!type || !field) {
      return value;
    }

    const valueCopy = [...value];

    return valueCopy.sort((a, b) => {
      const isAsc = type === 'asc';
      switch (field) {
        case 'date':
          return SortingPipe.compaire(a.date, b.date, isAsc);
        case 'viewCount':
          return a.statistics && b.statistics
            ? SortingPipe.compaire(Number(a.statistics.viewCount), Number(b.statistics.viewCount), isAsc) : 1;
        default:
          throw new Error('This categoties does not exist!');
      }
    });
  }

  private static compaire(a: Date | number, b: Date | number, isAsc: boolean) {
    return (a > b ? 1 : -1) * (isAsc ? 1 : -1);
  }
}
