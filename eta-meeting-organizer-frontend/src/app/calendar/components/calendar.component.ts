import { Component, OnInit } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Observable } from 'rxjs';
import { Reservation } from '~/app/models/reservation.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-calendar',
  styles: [
    `

    `,
  ],
  template: `
    <full-calendar
      deepChangeDetection="true"
      defaultView="timeGridWeek"
      [plugins]="calendarPlugins"
      [header]="options.header"
      [buttonText]="options.buttonText"
      [events]="calendarEvents"
    ></full-calendar>
  `
})
export class CalendarComponent implements OnInit {
  public id: number = 1;

  public options: OptionsInput;
  public calendarPlugins: object[] = [dayGridPlugin, timeGridPlugin];

  public reservation$: Observable<Reservation>;
  public reservation: Reservation;

  constructor(private readonly api: ApiCommunicationService) {}

  public calendarEvents: EventInput[] = [];

  public ngOnInit() {
    this.options = {
      buttonText: {
        next: 'next week',
        prev: 'previous week',
      },
      header: {
        center: 'title',
        left: 'prev next',
        right: 'today'
      }
    };

    this.api.reservation()
    .getOneReservationById(this.id).subscribe(
      (data) => {
        this.reservation = data;
        this.calendarEvents.push(
          {title: this.reservation.title, start: this.reservation.startingTime, end: this.reservation.endingTime}
        );
      }
    );
  }
}
