import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingBarService {
  public isOpened: boolean = false;

  constructor() { }
}
