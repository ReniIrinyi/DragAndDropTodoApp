import { Component, ViewChild, OnInit } from '@angular/core';
import {
  faStopwatch,
  faChevronRight,
  faPlus,
  faMinus,
  faCalendar,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  DataService,
  Task,
  Project,
  Subtask,
} from 'src/app/services/DataService';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @ViewChild(MatMenuTrigger) pomodoroMenuTrigger!: MatMenuTrigger;

  faStopwatch = faStopwatch;
  faChevronRight = faChevronRight;
  faPlus = faPlus;
  faMinus = faMinus;
  faCalendar = faCalendar;
  faCircle = faCircle;

  newProject: Project = {
    projectId: 0,
    projectName: '',
    completed: false,
    tasks: [],
    pomodoros: 0,
  };

  newTask: Task = {
    projectId: 0,
    taskId: 0,
    taskName: '',
    dueDate: '',
    pomodoros: 0,
    description: '',
    completed: false,
    subtasks: [],
  };

  newBubtask: Subtask = {
    subtaskId: 0,
    subtaskName: '',
    description: '',
    completed: false,
    pomodoros: 0,
  };

  selectedDate: Date | null = null;
  selectedIndex: number | undefined;

  tasksObject: Task[] = [];

  ngOnInit() {
    // this.dataService.clearDatabase();
    // console.log('db is clear');
    this.loadDbData();
  }

  async loadDbData() {
    try {
      this.tasksObject = await this.dataService.getAllTasks();
      console.log('Tasks:', this.tasksObject);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async addTask() {
    if (this.newTask.taskName.trim() !== '') {
      try {
        await this.dataService.addTask(this.newTask);
        console.log('Added task:', this.newTask);
        this.loadDbData();
      } catch (error) {
        console.log('Error adding task:', error);
      }
    }
  }

  updateSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
  }

  selectIndex(i: number) {
    this.selectedIndex = i;
  }

  addPomodoros(object: string, task: Task, taskId: number) {
    task.pomodoros++;
    this.dataService.updatePomodoros(object, taskId, task.pomodoros);
  }

  changePomodoroCount(change: number) {
    const newCount = this.newTask.pomodoros + change;
    if (newCount >= 1) {
      this.newTask.pomodoros = newCount;
    }
  }

  getIconCount(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  togglePomodoro(task: Task, index: number) {}
}
