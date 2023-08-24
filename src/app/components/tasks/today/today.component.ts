import { Component, OnInit } from '@angular/core';
import {
  faStopwatch,
  faCalendar,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Task, Project, DataService } from 'src/app/services/DataService';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  constructor(private dataService: DataService) {}

  faStopwatch = faStopwatch;
  faCalendar = faCalendar;
  faCircle = faCircle;

  pagedTasks: Task[] = [];
  selectedElement: Task | Project | undefined;
  pageIndex: number = 0;
  itemsPerPage = 5;

  tasksObject: Task[] = [];
  ngOnInit() {
    this.loadDbData();
  }

  async loadDbData() {
    try {
      this.tasksObject = await this.dataService.getAllTasks();
      this.setPage(0, 5);
    } catch (error) {
      console.error('Error loading data:', error);
    }
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
