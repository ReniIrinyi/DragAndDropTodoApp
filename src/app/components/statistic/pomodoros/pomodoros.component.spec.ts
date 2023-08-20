import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodorosComponent } from './pomodoros.component';

describe('PomodorosComponent', () => {
  let component: PomodorosComponent;
  let fixture: ComponentFixture<PomodorosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomodorosComponent]
    });
    fixture = TestBed.createComponent(PomodorosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
