import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { StatisticsFilterPipe } from '../youtube/pipes/statistics-filter.pipe';
import { CardStatisticsComponent } from './components/cards/card-statistics/card-statistics.component';
import { SetColorDatePlaceholderDirective } from './directives/set-color-date-placeholder.directive';
import { LoadersComponent } from './components/loaders/loaders.component';
import { InputComponent } from './components/input/input.component';
import { TitleButtonDateComponent } from './components/cards/title-button-date/title-button-date.component';
import { CardPreviewComponent } from './components/cards/card-preview/card-preview.component';
import { TitleFilterPipe } from '../youtube/pipes/title-filter.pipe';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { DateAgoPipe } from '../youtube/pipes/date-ago.pipe';

@NgModule({
  declarations: [
    CardStatisticsComponent,
    LoadersComponent,
    InputComponent,
    TitleButtonDateComponent,
    CardPreviewComponent,

    StatisticsFilterPipe,
    TitleFilterPipe,
    DateAgoPipe,

    SetColorDatePlaceholderDirective,
    ReadMoreComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,

    RouterModule,
  ],
  exports: [
    CardStatisticsComponent,
    CardPreviewComponent,
    TitleButtonDateComponent,
    SetColorDatePlaceholderDirective,
    LoadersComponent,
    InputComponent,
    ReadMoreComponent,
    StatisticsFilterPipe,
    DateAgoPipe,
  ],
})
export class SharedModule { }
