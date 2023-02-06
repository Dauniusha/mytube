import {
  Directive, ElementRef, HostBinding, Input,
} from '@angular/core';
import * as moment from 'moment';
import { setting } from 'src/app/settings/setting';

@Directive({
  selector: '[appSetColorDatePlaceholder]',
})
export class SetColorDatePlaceholderDirective {
  @HostBinding('style.background') public background: string = '';

  @HostBinding('style.box-shadow') public shadow: string = '';

  constructor(
    private elementRef: ElementRef,
  ) { }

  @Input() public isMain = false;

  @Input() set appSetColorDatePlaceholder(date: Date) {
    const daysDifference = moment().diff(moment(date), 'days');

    const color = SetColorDatePlaceholderDirective.getColor(daysDifference);

    if (this.isMain) {
      if ((<HTMLElement> this.elementRef.nativeElement).classList.contains('detailed-information__btn')) {
        this.shadow = `-2px 2px 4px rgba(${color}, 0.25)`;
        this.background = `rgb(${color})`;
      } else {
        this.shadow = `10px 20px 20px rgba(${color}, 0.25)`;
      }
    } else {
      this.background = `rgb(${color})`;
    }
  }

  private static getColor(daysDifference: number): string {
    if (daysDifference < 7) {
      return setting.stringConstants.color.blueRGB;
    } if (daysDifference < 30) {
      return setting.stringConstants.color.greenRGB;
    } if (daysDifference < 180) {
      return setting.stringConstants.color.yellowRGB;
    }
    return setting.stringConstants.color.redRGB;
  }
}
