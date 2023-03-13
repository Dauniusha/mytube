import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';
import { LoadingService } from 'src/app/core/services/loader/loading.service';
import { SortingBarService } from 'src/app/core/services/sorting/sorting-bar.service';
import { SortingService } from 'src/app/core/services/sorting/sorting.service';
import { selectorCards } from 'src/app/redux/selectors/cards.selectors';
import { AppState } from 'src/app/redux/state.models';
import { ICardData } from '../../models/card-data-interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public sortingByWordQuery: string = '';

  public sortData?: Sort;

  public customCards: Observable<ICustomCardData[]> = this.store.select(selectorCards.custom);

  public cards: Observable<ICardData[]> = this.store.select(selectorCards.youtube);

  constructor(
    public loadingService: LoadingService,
    private sortingService: SortingService,
    private store: Store<AppState>,
    public sortingBarService: SortingBarService,
  ) { }

  public ngOnInit(): void {
    this.sortingService.sorting.subscribe((sortData) => this.sortData = sortData);
    this.sortingService.filter.subscribe((query) => this.sortingByWordQuery = query);
  }
}
