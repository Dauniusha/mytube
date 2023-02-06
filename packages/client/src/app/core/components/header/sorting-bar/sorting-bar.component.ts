import { Component, OnInit } from '@angular/core';
import { SortingService } from 'src/app/core/services/sorting/sorting.service';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit {
  public queryString: string = '';

  constructor(public sortingService: SortingService) { }

  public ngOnInit(): void {
  }

  public wordSearching(event: Event) {
    this.queryString = (<HTMLInputElement> event.target).value;
    this.sortingService.setFilter(this.queryString);
  }
}
