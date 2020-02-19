import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarHeaderComponent } from './components/calendar-header.component';
import { CalendarComponent } from './components/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    FullCalendarModule,
    TranslateModule.forChild(),
  ],
  providers: [],
})
export class CalendarModule { }
