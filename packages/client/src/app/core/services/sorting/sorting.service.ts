import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  public sorting: BehaviorSubject<Sort> = new BehaviorSubject(<Sort> {});

  public filter: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public setSort(sortData: Sort) {
    this.sorting.next(sortData);
  }

  public setFilter(query: string) {
    this.filter.next(query);
  }
}
