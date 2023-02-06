import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleFilterPipe } from 'src/app/youtube/pipes/title-filter.pipe';

import { TitleButtonDateComponent } from './title-button-date.component';

describe('TitleButtonDateComponent', () => {
  let component: TitleButtonDateComponent;
  let fixture: ComponentFixture<TitleButtonDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TitleButtonDateComponent,
        TitleFilterPipe
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleButtonDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
