import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
})
export class CardPreviewComponent implements OnInit {
  @Input() previewLink?: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
