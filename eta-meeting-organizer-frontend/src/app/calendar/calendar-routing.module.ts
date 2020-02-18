import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar.component';

const routes: Routes = [
  {
    component: CalendarComponent,
    path: '',
  },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CalendarRoutingModule { }
