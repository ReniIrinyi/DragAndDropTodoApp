import { Injectable } from '@angular/core';
import * as localforage from 'localforage';

export interface Subtask {
  subtaskId: number;
  subtaskName: string;
  description: string;
  completed: boolean;
  pomodoros: number;
}

export interface Task {
  taskId: number;
  projectId: number;
  taskName: string;
  dueDate: string;
  pomodoros: number;
  description: string;
  completed: boolean;
  subtasks: Subtask[];
}

export interface Project {
  projectId: number;
  projectName: string;
  tasks: Task[];
  completed: boolean;
  pomodoros: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private projects: LocalForage;
  private tasks: LocalForage;
  private projectIdCounter: number = 1;
  private taskIdCounter: number = 1;
  private subtaskIdCounter: number = 1;

  private async initializeCounters() {
    const storedProjectIdCounter = await this.tasks.getItem<number>(
      'projectIdCounter'
    );
    const storedTaskIdCounter = await this.tasks.getItem<number>(
      'taskIdCounter'
    );
    const storedSubtaskIdCounter = await this.tasks.getItem<number>(
      'subtaskIdCounter'
    );

    this.projectIdCounter = storedProjectIdCounter || 1;
    this.taskIdCounter = storedTaskIdCounter || 1;
    this.subtaskIdCounter = storedSubtaskIdCounter || 1;
  }

  constructor() {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'TodoAppDatabase',
      version: 1,
      storeName: 'projectsAndTasks',
    });
    this.projects = localforage.createInstance({});
    this.tasks = localforage.createInstance({});
    this.initializeCounters();
  }
  async clearDatabase(): Promise<void> {
    try {
      await this.tasks.clear();
      await this.projects.clear();
      this.projectIdCounter = 1;
      this.taskIdCounter = 1;
      this.subtaskIdCounter = 1;
    } catch (error) {
      console.error('Error clearing database:', error);
      throw error;
    }
  }

  private async updateCounters() {
    await this.tasks.setItem('projectIdCounter', this.projectIdCounter);
    await this.tasks.setItem('taskIdCounter', this.taskIdCounter);
    await this.tasks.setItem('subtaskIdCounter', this.subtaskIdCounter);
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.tasks.getItem<Task[]>('tasks');
      return tasks || [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw error;
    }
  }

  async addTask(taskObject: Task): Promise<void> {
    try {
      taskObject.taskId = this.taskIdCounter;
      this.taskIdCounter++;
      const tasks = await this.getAllTasks();
      tasks.push(taskObject);
      await this.updateCounters();
      await this.tasks.setItem('tasks', tasks);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }
  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await this.projects.getItem<Project[]>('projects');
      return projects || [];
    } catch (error) {
      console.error('Error loading projects:', error);
      throw error;
    }
  }

  async addProject(projectObject: Project): Promise<void> {
    try {
      projectObject.projectId = this.projectIdCounter;
      this.projectIdCounter++;
      const projects = await this.getAllProjects();
      projects.push(projectObject);
      await this.updateCounters();
      await this.projects.setItem('projects', projects);
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  }

  async getSubtasks(taskId: number): Promise<Subtask[]> {
    try {
      const tasks = await this.getAllTasks();
      const task = tasks.find((task) => task.taskId === taskId);
      return task?.subtasks || [];
    } catch (error) {
      console.error('Error loading subtasks:', error);
      throw error;
    }
  }

  async addSubtasks(taskId: number, subtasks: Subtask[]): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].subtasks.push(...subtasks);
        await this.updateCounters();
        await this.tasks.setItem('tasks', tasks);
      }
    } catch (error) {
      console.error('Error adding subtasks:', error);
      throw error;
    }
  }

  async updatePomodoros(
    object: string,
    id: number,
    pomodoros: number
  ): Promise<void> {
    try {
      if (object == 'task') {
        const tasks = await this.getAllTasks();
        const updatedTasks = tasks.map((task: Task) => {
          if (task.taskId == id) {
            task.pomodoros = pomodoros;
          }
          return task;
        });
        await this.tasks.setItem('tasks', updatedTasks);
      } else if (object == 'project') {
        const projects = await this.getAllProjects();
        const updatedProjects = projects.map((project: Project) => {
          if (project.projectId === id) {
            project.pomodoros = pomodoros;
          }
          return project;
        });
        await this.projects.setItem('projects', updatedProjects);
      }
    } catch (error) {
      console.error('Error updating pomodoros:', error);
      throw error;
    }
  }
}
