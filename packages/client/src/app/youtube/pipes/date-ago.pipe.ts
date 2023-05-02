import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  public transform(date?: Date): string {
    if (!date) {
      return '';
    }

    const diff = Date.now() - date.getTime();
    const day = 1000 * 60 * 60 * 24;
    
    return Math.floor(diff / (day * 12 * 365.25))
      ? `${Math.floor(diff / (day * 60 * 24 * 365.25))} years ago`
      : Math.floor(diff / (day * 12))
        ? `${Math.floor(diff / (day * 12))} month ago`
        : Math.floor(diff / day)
          ? `${Math.floor(diff / day)} days ago`
          : `< 1 day ago`;
  }
}
