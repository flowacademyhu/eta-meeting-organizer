import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import { Locale } from '@fullcalendar/core/datelib/locale';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationBookingComponent } from '~/app/shared/Modals/reservation-book.component';
import { UserToken } from '~/app/shared/models/user-token.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { ReservationService } from '~/app/shared/services/reservation.service';

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
      [selectable]=selectable()
      [selectMirror]="true"
      [selectOverlap]="false"
      (select)="bookDialog($event)"
    ></full-calendar>
  `
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {

  public dialogUnsub: Subscription;

  protected locales: Locale[] = [huLocale, enGbLocale];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public subs: Subscription;
  public userToken: UserToken = {} as UserToken;

  @Input('meetingRoom')
  public meetingRoom: MeetingRoom;

  @Input('checked')
  public checked: boolean;

  public posted: boolean;

  public options: OptionsInput;
  public calendarPlugins: object[] = [dayGridPlugin, timeGridPlugin, interactionPlugin];

  public reservations: Reservation[];
  public reservations$: Observable<Reservation[]>;

  constructor(private readonly api: ApiCommunicationService,
              private readonly authService: AuthService,
              private readonly translate: TranslateService,
              private readonly dialog: MatDialog,
              private readonly reservationService: ReservationService) {
    this.subs = this.authService.user.pipe(take(1))
    .subscribe((data) => {
      console.log('data', data);
      this.userToken = data;
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
    this.reservations$ = this.reservationService.reservationBehaviourSubject;
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
      this.getReservationsByUser();
    } else if (changes?.meetingRoom?.currentValue ||
      (!this.checked && this.meetingRoom !== undefined) ||
      changes?.posted?.currentValue) {
        this.getReservationsByMeetingRoom();
    }
  }

  public bookDialog(event: EventInput) {
    const dialogRef = this.dialog.open(ReservationBookingComponent, {
      width: '400px',
      data: {
        userId: this.userToken.sub,
        meetingRoomId: this.meetingRoom.id,
        startingTime: event.startStr,
        endingTime: event.endStr
      },
    });
    dialogRef.componentInstance.passEntry.subscribe(() => {
      this.getReservationsByMeetingRoom();
    });
    this.dialogUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public ngOnDestroy(): void {
    if (this.dialogUnsub) {
      this.dialogUnsub.unsubscribe();
    }
  }

  public selectable() {
    if (this.checked || !this.meetingRoom) {
      return false;
    } else {
      return true;
    }
  }

  public getReservationsByMeetingRoom() {
    this.api.reservation()
      .findByMeetingRoomId(this.meetingRoom.id)
      .subscribe(
      (data) => {
        this.reservations = data;
        console.log(this.reservations);
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

  getReservationsByUser() {
    this.api.reservation()
    .getReservationsByUserId(this.userToken.sub)
    .subscribe(
      (data) => {
        console.log('data: ', data);
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
