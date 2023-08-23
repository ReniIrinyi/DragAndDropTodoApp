import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faStopwatch,
  faChevronRight,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/services/DataService';

@Component({
  selector: 'app-show-pomodoros',
  templateUrl: './show-pomodoros.component.html',
  styleUrls: ['./show-pomodoros.component.scss'],
})
export class ShowPomodorosComponent implements OnInit {
  @Input() newTask: Task = {
    projectId: 0,
    taskId: 0,
    name: '',
    dueDate: '',
    pomodoros: 0,
    description: '',
    completed: false,
    subtasks: [],
    tags: [],
  };
  @Output() newTaskUpdated = new EventEmitter<Task>();

  faStopwatch = faStopwatch;
  faChevronRight = faChevronRight;
  faPlus = faPlus;
  faMinus = faMinus;

  ngOnInit(): void {}

  setPomodoroCount(pomodoro: number) {
    this.newTask.pomodoros = pomodoro;
    this.newTaskUpdated.emit(this.newTask);
  }

  changePomodoroCount(change: number) {
    const newCount = this.newTask.pomodoros + change;
    if (newCount >= 0) {
      this.newTask.pomodoros = newCount;
    }
  }
}
