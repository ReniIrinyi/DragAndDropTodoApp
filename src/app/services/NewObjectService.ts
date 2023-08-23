import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './DataService';
import { Task, Project, Subtask } from './DataService';

@Injectable({
  providedIn: 'root',
})
export class NewObjectService {
  private newProjectSubject = new BehaviorSubject<Project>({
    projectId: 0,
    name: '',
    completed: false,
    tasks: [],
    pomodoros: 0,
    tags: [],
  });

  private newTaskSubject = new BehaviorSubject<Task>({
    projectId: 0,
    taskId: 0,
    name: '',
    dueDate: '',
    pomodoros: 0,
    description: '',
    completed: false,
    subtasks: [],
    tags: [],
  });

  private newSubtaskSubject = new BehaviorSubject<Subtask>({
    subtaskId: 0,
    subtaskName: '',
    description: '',
    completed: false,
    pomodoros: 0,
  });

  constructor(private dataService: DataService) {}

  getNewProjectSubject() {
    return this.newProjectSubject.asObservable();
  }

  getNewTaskSubject() {
    return this.newTaskSubject.asObservable();
  }

  getNewSubtaskSubject() {
    return this.newSubtaskSubject.asObservable();
  }

  async addTask(task: Task) {
    try {
      await this.dataService.addTask(task);
      this.newTaskSubject.next(task); // Emit the new task to subscribers
      console.log('Added task:', task);
    } catch (error) {
      console.log('Error adding object:', error);
    }
  }

  async addProject(project: Project) {
    try {
      await this.dataService.addProject(project);
      this.newProjectSubject.next(project); // Emit the new project to subscribers
      console.log('Added project:', project);
    } catch (error) {
      console.log('Error adding object:', error);
    }
  }

  async addSubtasksToTask(taskId: number, subtasks: Subtask[]) {
    try {
      this.dataService.addSubtasks(taskId, subtasks);
    } catch (error) {
      console.error('Error adding subtasks to task:', error);
    }
  }

  async updatePomodoros(object: string, id: number, pomodoros: number) {
    try {
      this.dataService.updatePomodoros(object, id, pomodoros);
    } catch (error) {
      console.error('Error updating pomodoros:', error);
      throw error;
    }
  }
}
