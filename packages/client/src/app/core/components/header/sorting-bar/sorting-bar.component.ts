import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SortingService } from 'src/app/core/services/sorting/sorting.service';
import { VideosService } from '../../../services/videos.service';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit {
  public queryString: string = '';

  constructor(
    public sortingService: SortingService,
    private videosService: VideosService,
  ) { }

  public ngOnInit(): void {
  }

  public wordSearching(event: Event) {
    this.queryString = (<HTMLInputElement> event.target).value;
    this.sortingService.setFilter(this.queryString);
  }

  setSort(sortData: Sort) {
    this.videosService.setFilter({
      sortings: {
        [sortData.active]: sortData.direction,
      },
    });
  }
}
