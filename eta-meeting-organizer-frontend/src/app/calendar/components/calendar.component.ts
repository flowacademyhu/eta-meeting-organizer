import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import { Locale } from '@fullcalendar/core/datelib/locale';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { Reservation } from '~/app/models/reservation.model';
import { UserToken } from '~/app/shared/models/user-token.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';

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
      [locale]="'hu'"
      [height]="'auto'"
      [footer]="'auto'"
    ></full-calendar>
  `
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {

  protected locales: Locale[] = [huLocale, enGbLocale];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public subs: Subscription;
  public user: UserToken = {} as UserToken;

  @Input('meetingRoom')
  public meetingRoom: MeetingRoom;

  @Input('checked')
  public checked: boolean;

  public options: OptionsInput;
  public calendarPlugins: object[] = [dayGridPlugin, timeGridPlugin];

  public reservations: Reservation[];

  constructor(private readonly api: ApiCommunicationService,
              private readonly authService: AuthService,
              private readonly translate: TranslateService) {
    this.subs = this.authService.user.pipe(take(1))
    .subscribe((data) => {
      this.user = data;
    });
  }

  public calendarEvents: EventInput[] = [];

  @ViewChild('calendar')
  public calendarComponent: FullCalendarComponent; // the #calendar in the template

  public ngOnInit() {
    this.options = {
      buttonText: {
        today: 'Ma'
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
        meridiem: false
      },
      titleFormat: {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      },
    };
  }

  public ngAfterViewInit() {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.setCalendarLang(params.lang);
      });
  }

  private setCalendarLang(lang: string) {
    if (lang === 'en') {
      lang = 'en-gb';
      if (this.options.buttonText) { this.options.buttonText.today = 'Today'; }
    } else {
      if (this.options.buttonText) { this.options.buttonText.today = 'Ma'; }
      lang = 'hu';
    }
    this.calendarComponent.getApi()
      .setOption('locale', lang);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.checked?.currentValue && this.checked) {
      this.api.reservation()
      .getReservationsByUserId(this.user.sub)
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
