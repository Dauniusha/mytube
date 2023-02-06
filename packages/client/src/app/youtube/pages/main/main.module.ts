import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MiniCardComponent } from '../../components/mini-card/mini-card.component';
import { MainComponent } from './main.component';

import { FilterByWordPipe } from '../../pipes/filter-by-word.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { MainRoutingModule } from './main-routing.module';
import { CustomMiniCardComponent } from '../../components/custom-mini-card/custom-mini-card.component';

@NgModule({
  declarations: [
    MainComponent,
    MiniCardComponent,
    CustomMiniCardComponent,

    FilterByWordPipe,
    SortingPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    MatIconModule,
  ],
})
export class MainModule { }
