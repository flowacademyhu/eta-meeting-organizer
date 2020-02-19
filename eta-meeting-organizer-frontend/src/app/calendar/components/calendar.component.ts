import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import { Locale } from '@fullcalendar/core/datelib/locale';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Reservation } from '~/app/models/reservation.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-calendar',
  styles: [``],
  template: `
    <full-calendar
      #calendar
      deepChangeDetection="true"
      defaultView="timeGridWeek"
      [plugins]="calendarPlugins"
      [header]="options.header"
      [buttonText]="options.buttonText"
      [events]="calendarEvents"
      [firstDay]="1"
      [allDaySlot]
      [slotDuration]="'00:15:00'"
      [minTime]="'06:00:00'"
      [maxTime]="'22:00:00'"
      [slotLabelFormat]="options.slotLabelFormat"
      [columnHeaderFormat]="options.columnHeaderFormat"
      [titleFormat]="options.titleFormat"
      [nowIndicator]="true"
    ></full-calendar>
  `
})
export class CalendarComponent implements OnInit, AfterViewInit {

  protected locales: Locale[] = [huLocale];

  public userId: string = '111455286747437812553';

  public options: OptionsInput;
  public calendarPlugins: object[] = [dayGridPlugin, timeGridPlugin];

  public reservations: Reservation[];

  constructor(private readonly api: ApiCommunicationService) {}

  public calendarEvents: EventInput[] = [];

  @ViewChild('calendar')
  public calendarComponent: FullCalendarComponent; // the #calendar in the template

  public ngOnInit() {
    this.options = {
      buttonText: {
        next: 'next week',
        prev: 'previous week'
      },
      columnHeaderFormat: {
        weekday: 'long'
      },
      header: {
        center: 'title',
        left: 'prev next',
        right: 'today'
      },
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      titleFormat: {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    };

    this.api.reservation()
    .getReservationsByUserId(this.userId)
    .subscribe(
      (data) => {
        this.reservations = data;
        for (const reservation of this.reservations) {
          this.calendarEvents.push(
            {
              end: reservation.endingTime,
              overlap: false,
              start: reservation.startingTime,
              title: reservation.title
              + '\n' + 'meetingroom-name',
            }
          );
        }
      }
    );
  }

  public ngAfterViewInit() {
    // this.calendarComponent.locales = [huLocale];
    // this.calendarComponent.locale = 'hu';
    this.calendarComponent.getApi()
    .setOption('locales', this.locales);
    this.calendarComponent.getApi()
    .setOption('locale', 'hu');
  }
}
