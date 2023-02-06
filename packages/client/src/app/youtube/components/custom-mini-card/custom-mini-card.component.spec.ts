import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMiniCardComponent } from './custom-mini-card.component';

describe('CustomMiniCardComponent', () => {
  let component: CustomMiniCardComponent;
  let fixture: ComponentFixture<CustomMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMiniCardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
