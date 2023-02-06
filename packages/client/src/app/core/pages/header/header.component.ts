import { Component, OnInit } from '@angular/core';
import { SortingBarService } from '../../services/sorting/sorting-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public sortingBarService: SortingBarService) { }

  public ngOnInit(): void { }
}
