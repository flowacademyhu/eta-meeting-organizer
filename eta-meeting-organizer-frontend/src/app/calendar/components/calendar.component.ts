import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationBookingComponent } from '~/app/shared/Modals/reservation-book.component';
import { ReservationUpdateComponent } from '~/app/shared/Modals/reservation-update.component';
import { UserToken } from '~/app/shared/models/user-token.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { ReservationService } from '~/app/shared/services/reservation.service';

@Component({
  selector: 'app-calendar',
  styles: [`
  a.fc-time-grid-event.fc-event {
    cursor: pointer;
  }
  `],
  template: `
    <full-calendar
      class="myCalendar"
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
      (eventClick)="updateDialog($event)"
      (eventMouseEnter)="onMouseEnter($event)"
      [height]="'auto'"
      [footer]="'auto'"
    ></full-calendar>
  `
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  protected locales: Locale[] = [huLocale, enGbLocale];

  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    this.authService.user.pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
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
    dialogRef.componentInstance.passEntry.pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.getReservationsByMeetingRoom();
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  public updateDialog(el: any) {
    if (this.checked) { // el.event.extendedProps.userId === this.userToken.sub ||
      const dialogRef = this.dialog.open(ReservationUpdateComponent, {
        width: '400px',
        data: {
          id: el.event.id,
          userId: this.userToken.sub,
          meetingRoomId: el.event.groupId,
          startingTime: el.event.start,
          endingTime: el.event.end,
          title: el.event.title,
          summary: el.event.extendedProps.summary
        },
      });
      dialogRef.componentInstance.passEntry.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getReservationsByUser();
      });
      dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      (data) => {
        this.reservations = data;
        this.calendarEvents = [];
        for (const reservation of this.reservations) {
          this.calendarEvents.push(
            {
              id: reservation.id,
              userId: reservation.user?.id,
              groupId: this.userToken.sub,
              end: reservation.endingTime,
              overlap: false,
              start: reservation.startingTime,
              title: reservation.user?.username, // Ide a user e-mail címe kell, akit tette a foglalást.
            }
          );
        }
      }
    );
  }

  public getReservationsByUser() {
    this.api.reservation()
    .getReservationsByUserId(this.userToken.sub)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.reservations = data;
        this.calendarEvents = [];
        for (const reservation of this.reservations) {
          this.calendarEvents.push(
            {
              id: reservation.id,
              groupId: reservation.meetingRoom?.id,
              end: reservation.endingTime,
              overlap: false,
              start: reservation.startingTime,
              title: reservation.meetingRoom?.name,
              summary: reservation.summary
            }
          );
        }
      }
    );
  }

  public onMouseEnter(el: any) {
    alert(el.event.extendedProps.summary);
  }

}
