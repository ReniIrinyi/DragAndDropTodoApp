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
import { SelectedElementService } from 'src/app/services/SelectedElementservice';
import { NewObjectService } from 'src/app/services/NewObjectService';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private selectedElementService: SelectedElementService,
    private newObjectService: NewObjectService
  ) {}

  @ViewChild(MatMenuTrigger) pomodoroMenuTrigger!: MatMenuTrigger;

  faStopwatch = faStopwatch;
  faChevronRight = faChevronRight;
  faPlus = faPlus;
  faMinus = faMinus;
  faCalendar = faCalendar;
  faCircle = faCircle;

  newProject: Project = {
    projectId: 0,
    name: '',
    completed: false,
    tasks: [],
    pomodoros: 0,
    tags: [],
  };

  newTask: Task = {
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

  newSubtask: Subtask = {
    subtaskId: 0,
    subtaskName: '',
    description: '',
    completed: false,
    pomodoros: 0,
  };

  tasksObject: Task[] = [];
  projectsObject: Project[] = [];
  subtasksObject: Subtask[] = [];

  pagedTasks: Task[] = [];
  selectedElement: Task | Project | undefined;
  pageIndex: number = 0;
  itemsPerPage = 5;

  ngOnInit() {
    // this.dataService.clearDatabase();
    // console.log('db is clear');
    this.loadDbData();
  }

  async loadDbData() {
    try {
      this.tasksObject = await this.dataService.getAllTasks();
      this.projectsObject = await this.dataService.getAllProjects();

      this.setPage(0, this.itemsPerPage);
      console.log('Tasks:', this.tasksObject);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  updateNewTask(newTask: Task) {
    this.newTask = newTask;
  }
  async addTask() {
    if (this.newTask.name.trim() !== '') {
      try {
        await this.newObjectService.addTask(this.newTask);
        console.log('Added task:', this.newTask);
        this.loadDbData();
      } catch (error) {
        console.log('Error adding task:', error);
      }
    }
  }

  async getSubTask(taskId: number) {
    try {
      return await this.dataService.getSubtasks(taskId);
    } catch (error) {
      console.log('Error fetching data', error);
      throw error;
    }
  }

  handleTaskClick(element: HTMLElement, index: number) {
    console.log(index);
    this.tasksObject.find((el) => {
      if (el.taskId - 1 == index) {
        this.selectedElementService.setSelectedElement(el);
        this.selectedElement = this.selectedElementService.getSelectedElement();
        element.classList.add('tasks-container--selected');
      }
    });
  }

  handlePageChange(event: any, itemsPerPage: number) {
    this.setPage(event.pageIndex, itemsPerPage);
  }

  setPage(pageIndex: number, itemsPerPage: number) {
    const startIndex = pageIndex * itemsPerPage;
    this.pagedTasks = this.tasksObject.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }
}
