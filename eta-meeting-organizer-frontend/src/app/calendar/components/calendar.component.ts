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

  public calendarEvents: EventInput[] = [
    {title: 'Weekend Begins', start: new Date('Feb 14, 2020 16:00:00'), end: new Date('Feb 14, 2020 18:00:00')},
    {title: 'Uncle Bob needs money', start: new Date('Feb 15, 2020 14:00:00')},
    {title: 'Searching for money', start: new Date('Feb 13, 2020 08:00:00')}
  ];

  public ngOnInit() {
    this.options = {
      buttonText: {
        next: 'next month',
        prev: 'previous month',
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
          {title: 'Something', start: this.reservation.startingTime, end: this.reservation.endingTime}
        );
      }
    );
  }
}
