import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPomodorosComponent } from './show-pomodoros.component';

describe('ShowPomodorosComponent', () => {
  let component: ShowPomodorosComponent;
  let fixture: ComponentFixture<ShowPomodorosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPomodorosComponent]
    });
    fixture = TestBed.createComponent(ShowPomodorosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
