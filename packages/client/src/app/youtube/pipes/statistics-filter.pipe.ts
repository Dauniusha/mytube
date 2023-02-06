import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statisticsFilter',
})
export class StatisticsFilterPipe implements PipeTransform {
  public transform(value?: string): string {
    if (!value) {
      return '';
    }

    const numberValue = Number(value);

    if (numberValue > 999999) {
      return `${Math.floor(numberValue / 1000000)}mln`;
    } if (numberValue > 9999) {
      return `${Math.floor(numberValue / 1000)}k`;
    }

    return value;
  }
}
