import { Component, OnInit } from '@angular/core';
import { faChartLine, faGear } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';
import { StatisticComponent } from '../statistic/statistic/statistic.component';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private settings: MatDialogRef<SettingsComponent> | undefined;
  private statistic: MatDialogRef<StatisticComponent> | undefined;
  faStopwach = faStopwatch;

  constructor(private dialog: MatDialog) {}

  faChartLine = faChartLine;
  faGear = faGear;

  ngOnInit(): void {}

  openSettings() {
    this.settings = this.dialog.open(SettingsComponent, {
      width: '400px',
      data: {
        SettingsComponent: this,
      },
    });
  }

  openStatistic() {
    this.statistic = this.dialog.open(StatisticComponent, {
      width: '400px',
      data: {
        StatisticComponent: this,
      },
    });
  }
}
