import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { TimerComponent } from './components/timer/timer.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ProjectsMenuComponent } from './components/projects-menu/projects-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TodayComponent } from './components/tasks/today/today.component';
import { TomorrowComponent } from './components/tasks/tomorrow/tomorrow.component';
import { WeekComponent } from './components/tasks/week/week.component';
import { DoneComponent } from './components/tasks/done/done.component';
import { AllComponent } from './components/tasks/all/all.component';
import { PomodorosComponent } from './components/statistic/pomodoros/pomodoros.component';
import { TasksComponent } from './components/statistic/tasks/tasks.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

const routes: Routes = [
  { path: 'main', component: TodayComponent },
  { path: 'today', component: TodayComponent },
  { path: 'tomorrow', component: TodayComponent },
  { path: 'week', component: TodayComponent },
  { path: 'done', component: TodayComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    TimerComponent,
    CalenderComponent,
    ProjectsMenuComponent,
    HeaderComponent,
    SettingsComponent,
    TodayComponent,
    TomorrowComponent,
    WeekComponent,
    DoneComponent,
    AllComponent,
    PomodorosComponent,
    TasksComponent,
    NewTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
