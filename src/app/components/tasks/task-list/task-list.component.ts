import { Component, Input, OnInit } from '@angular/core';
import { SelectedElementService } from 'src/app/services/SelectedElementservice';
import { Task, Project, DataService } from 'src/app/services/DataService';
import { faCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private selectedElementService: SelectedElementService,
    private dataservice: DataService
  ) {}
  @Input() pagedTasks: Task[] = [];
  @Input() container!: HTMLElement;
  tasksObject: Task[] = [];

  selectedElement: Project | Task | undefined;
  faCircle = faCircle;
  faStopwatch = faStopwatch;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.tasksObject = await this.dataservice.getAllTasks();
  }
  handleClick(element: HTMLElement, index: number) {
    this.tasksObject.find((el) => {
      if (el.id - 1 == index) {
        this.selectedElementService.setSelectedElement(el);
        this.selectedElement = this.selectedElementService.getSelectedElement();
        element.classList.add('tasks-container--selected');
      }
    });
  }
}
