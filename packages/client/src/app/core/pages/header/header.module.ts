import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header.component';
import { SearchBarComponent } from '../../components/header/search-bar/search-bar.component';
import { SettingBtnComponent } from '../../components/header/setting-btn/setting-btn.component';
import { SortingBarComponent } from '../../components/header/sorting-bar/sorting-bar.component';
import { UserProfileComponent } from '../../components/header/user-profile/user-profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SettingBtnComponent,
    SearchBarComponent,
    UserProfileComponent,
    SortingBarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
