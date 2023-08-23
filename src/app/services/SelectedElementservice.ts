import { Injectable } from '@angular/core';
import { Task, Project } from './DataService';
import { DataService } from './DataService';

@Injectable({
  providedIn: 'root',
})
export class SelectedElementService {
  private selectedElement: Task | Project | undefined;

  constructor(private dataService: DataService) {}

  setSelectedElement(element: Task | Project): void {
    this.selectedElement = element;
  }

  getSelectedElement(): Task | Project | undefined {
    return this.selectedElement;
  }

  async saveSelectedElementChanges(): Promise<void> {
    if (this.selectedElement) {
      try {
        if ('taskId' in this.selectedElement) {
          await this.dataService.updateTask(this.selectedElement);
        } else if ('projectId' in this.selectedElement) {
          await this.dataService.updateProject(this.selectedElement);
        }
      } catch (error) {
        console.error('Error updating selected element:', error);
        throw error;
      }
    }
  }
}
