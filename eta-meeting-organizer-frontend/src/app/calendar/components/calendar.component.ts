import { Component, OnInit } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
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
  public userId: number = 1;

  public options: OptionsInput;
  public calendarPlugins: object[] = [dayGridPlugin, timeGridPlugin];

  public reservations: Reservation[];
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
    .getReservationsByUserId(this.userId)
    .subscribe(
      (data) => {
        this.reservations = data;
        for (let i = 0; i < this.reservations.length; i++) {
          this.calendarEvents.push(
            {
              end: this.reservations[i].endingTime,
              start: this.reservations[i].startingTime,
              title: this.reservations[i].title
            }
          );
        }
      }
    );
  }
}
