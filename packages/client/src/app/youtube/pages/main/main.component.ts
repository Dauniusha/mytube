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
import { VideosApi } from '../../../core/services/api/videos.api';
import { VideosService } from '../../../core/services/videos.service';
import { CardData } from '../../models/card-data.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  sortingByWordQuery: string = '';

  sortData?: Sort;

  customCards: Observable<ICustomCardData[]> = this.store.select(selectorCards.custom);

  videoCards: CardData[] = [];

  constructor(
    public loadingService: LoadingService,
    private sortingService: SortingService,
    private store: Store<AppState>,
    public sortingBarService: SortingBarService,
    private videosService: VideosService,
  ) { }

  public ngOnInit(): void {
    this.videosService.filteredVideos$.subscribe(({ getFiltered: videos }) => {
      this.videoCards = videos.map((x) => ({
        date: new Date(x.createdAt),
        description: x.description ?? '',
        id: x.id,
        title: x.name,
        imgLink: x.preview,
        statistics: {
          commentCount: x.commentsAmount.toString(),
          dislikeCount: x.dislikes.toString(),
          likeCount: x.likes.toString(),
          viewCount: x.views.toString(),
        },
      }));
    });
  }
}
