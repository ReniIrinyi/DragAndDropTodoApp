import { Component, Input, OnInit } from '@angular/core';
import {
  faStopwatch,
  faCalendar,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Task, Project } from 'src/app/services/DataService';

@Component({
  selector: 'app-selected-task',
  templateUrl: './selected-task.component.html',
  styleUrls: ['./selected-task.component.scss'],
})
export class SelectedTaskComponent implements OnInit {
  @Input() selectedElement: Task | Project | undefined;
  faStopwatch = faStopwatch;
  faCalendar = faCalendar;
  faCircle = faCircle;

  ngOnInit(): void {}
}
