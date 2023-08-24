import { Component, OnInit } from '@angular/core';
import {
  DataService,
  Task,
  Project,
  Subtask,
} from 'src/app/services/DataService';
import { NewObjectService } from 'src/app/services/NewObjectService';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private newObjectService: NewObjectService
  ) {}

  faPlus = faPlus;
  faMinus = faMinus;

  ngOnInit(): void {
    this.loadDbData();
    // this.dataService.clearDatabase();
    // console.log('db is clear');
  }
  newProject: Project = {
    id: 0,
    name: '',
    completed: false,
    tasks: [],
    pomodoros: 0,
    tags: [],
  };

  newTask: Task = {
    projectId: 0,
    id: 0,
    name: '',
    dueDate: '',
    pomodoros: 0,
    description: '',
    completed: false,
    subtasks: [],
    tags: [],
  };

  newSubtask: Subtask = {
    id: 0,
    subtaskName: '',
    description: '',
    completed: false,
    pomodoros: 0,
  };

  tasksObject: Task[] = [];
  projectsObject: Project[] = [];
  subtasksObject: Subtask[] = [];

  async loadDbData() {
    try {
      this.tasksObject = await this.dataService.getAllTasks();
      this.projectsObject = await this.dataService.getAllProjects();

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
}
