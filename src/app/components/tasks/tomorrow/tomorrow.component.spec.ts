import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowComponent } from './tomorrow.component';

describe('TomorrowComponent', () => {
  let component: TomorrowComponent;
  let fixture: ComponentFixture<TomorrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TomorrowComponent]
    });
    fixture = TestBed.createComponent(TomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
