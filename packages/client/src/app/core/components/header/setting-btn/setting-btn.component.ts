import { Component, OnInit } from '@angular/core';
import { SortingBarService } from 'src/app/core/services/sorting/sorting-bar.service';

@Component({
  selector: 'app-setting-btn',
  templateUrl: './setting-btn.component.html',
  styleUrls: ['./setting-btn.component.scss'],
})
export class SettingBtnComponent implements OnInit {
  constructor(public sortingBarService: SortingBarService) { }

  public ngOnInit(): void { }

  public changeOpenedState() {
    this.sortingBarService.isOpened = !this.sortingBarService.isOpened;
  }
}
