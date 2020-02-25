import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarHeaderComponent } from './components/calendar-header.component';

const routes: Routes = [
  {
    component: CalendarHeaderComponent,
    path: '',
  },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CalendarRoutingModule { }
