import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faPlay,
  faPause,
  faStop,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faClock = faClock;
  currentIcon = faPlay;
  minutes: number = 25; // Work session duration in minutes
  seconds: number = 0;
  isRunning: boolean = false;
  interval: any;

  ngOnInit(): void {
    this.resetTimer();
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.stopTimer();
        }
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.minutes = 25;
    this.seconds = 0;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
