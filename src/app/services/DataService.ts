import { Injectable } from '@angular/core';
declare global {
  interface Window {
    electron: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
    };
  }
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  async getAllProjects() {
    return await window.electron.send('get-all-projects', null);
  }

  async getTasksByProjectId(projectId: string) {
    return await window.electron.send('get-tasks-by-project', projectId);
  }

  // CRUD operations
}
