import { Component, OnInit, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Tags, Task, Project } from 'src/app/services/DataService';
import { DataService } from 'src/app/services/DataService';
import { SelectedElementService } from 'src/app/services/SelectedElementservice';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  allTags: Tags[] = [];
  selectedElement: Task | Project | undefined;
  constructor(
    private dataService: DataService,
    private selectedElementService: SelectedElementService
  ) {}

  ngOnInit(): void {
    this.selectedElement = this.selectedElementService.getSelectedElement();
    console.log(this.selectedElement);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);
    if (value) {
      this.selectedElementService
        .getSelectedElement()
        ?.tags.push({ name: value });
      this.selectedElementService.saveSelectedElementChanges();
    }

    event.chipInput!.clear();
  }

  remove(tag: Tags): void {
    const index = this.selectedElementService
      .getSelectedElement()
      ?.tags.findIndex((t) => t.name === tag.name);

    if (index !== undefined && index >= 0) {
      this.selectedElementService.getSelectedElement()?.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag.name}`);
      this.selectedElementService.saveSelectedElementChanges();
    }
  }

  edit(tag: Tags, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);

      return;
    }

    const index = this.selectedElementService
      .getSelectedElement()
      ?.tags.findIndex((t) => t.name === tag.name);
    if (index !== undefined && index >= 0) {
      this.selectedElementService.getSelectedElement()!.tags[index].name =
        value;
      this.selectedElementService.saveSelectedElementChanges();
    }
  }
  async loadDbData() {
    try {
      this.allTags = await this.dataService.getAllTags();
      console.log(this.allTags);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
