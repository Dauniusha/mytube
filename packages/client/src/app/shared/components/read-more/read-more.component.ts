import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() maxHeight: number = 100;

  public isCollapsed: boolean = false;
  public isCollapsable: boolean = false;

  constructor(private elementRef: ElementRef<Element>) {}

  ngAfterViewInit() {
    const currentHeight = this.elementRef.nativeElement
      .getElementsByClassName('read-more__content')[0].clientHeight;
      console.log(currentHeight)

    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  }

  switch() {
    this.isCollapsed = !this.isCollapsed;
  }
}
