import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import { Locale } from '@fullcalendar/core/datelib/locale';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MeetingRoom } from '~/app/models/meetingroom.model';
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
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {

  protected locales: Locale[] = [huLocale];

  public userId: string = '111455286747437812553';

  @Input('meetingRoom')
  public meetingRoom: MeetingRoom;

  @Input('checked')
  public checked: boolean;

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
  }

  public ngAfterViewInit() {
    // this.calendarComponent.locales = [huLocale];
    // this.calendarComponent.locale = 'hu';
    this.calendarComponent.getApi()
    .setOption('locales', this.locales);
    this.calendarComponent.getApi()
    .setOption('locale', 'hu');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.checked?.currentValue && this.checked) {
      console.log('If ág')
      this.api.reservation()
      .getReservationsByUserId(this.userId)
      .subscribe(
        (data) => {
          this.reservations = data;
          this.calendarEvents = [];
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
    } else if (changes?.meetingRoom?.currentValue || (!this.checked && this.meetingRoom !== undefined)) {
      console.log(!this.checked);
      this.api.reservation()
      .findByMeetingRoomId(this.meetingRoom.id)
      .subscribe(
      (data) => {
        this.reservations = data;
        this.calendarEvents = [];
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
  }

}
