import { Pipe, PipeTransform } from '@angular/core';
import { setting } from 'src/app/settings/setting';

@Pipe({
  name: 'titleFilter',
})
export class TitleFilterPipe implements PipeTransform {
  public transform(value?: string, needLength: number = setting.numberConstants.defaultTitleLength): string {
    if (!value) {
      return '';
    }

    return value.length > needLength ? `${value.slice(0, needLength - 3)}...` : value;
  }
}
