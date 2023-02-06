import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = false;

  constructor() { }

  public loading() {
    this.isLoading = true;
  }

  public loaded() {
    this.isLoading = false;
  }
}
