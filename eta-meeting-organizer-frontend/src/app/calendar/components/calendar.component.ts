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
import { Role } from '~/app/models/user.model';
import { ReservationBookingComponent } from '~/app/shared/Modals/reservation-book.component';
import { ReservationInfoComponent } from '~/app/shared/Modals/reservation-info.component';
import { ReservationTimeUpdateComponent } from '~/app/shared/Modals/reservation-time-update';
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
      [allDaySlot]="false"
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
      (eventClick)="getInfo($event)"
      [height]="'auto'"
      [footer]="'auto'"
      [editable]="meetingRoom && !checked"
      [eventLimit]="true"
      (eventResize)="updateReservationTime($event)"
      [eventColor]="'#e64b3a'"
      [eventTextColor]="'#333333'"
      [displayEventTime]="true"
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

  @ViewChild('calendar')
  public calendarComponent: FullCalendarComponent;

  public posted: boolean;

  protected isReader: boolean = false;

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
    this.checkReader();
  }

  protected checkReader(): void {
    (this.userToken.role === Role.READER) ? this.isReader = true : this.isReader = false;
  }

  public calendarEvents: EventInput[] = [];

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
      disableClose: true,
      height: '60%',
      width: '25%',
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

  public getInfo(eventInput: EventInput) {
    if (this.checked) { // el.event.extendedProps.userId === this.userToken.sub ||
    const dialogRef = this.dialog.open(ReservationInfoComponent, {
      width: '400px',
      data: {
        id: eventInput.event.id,
        userId: this.userToken.sub,
        userName: eventInput.event.extendedProps.userName,
        meetingRoomName: eventInput.event.extendedProps.meetingRoomName,
        meetingRoomId: eventInput.event.extendedProps.meetingRoomId,
        start: eventInput.event.start,
        end: eventInput.event.end,
        title: eventInput.event.title,
        summary: eventInput.event.extendedProps.summary
      },
    });
    dialogRef.componentInstance.closeOutput.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.getReservationsByUser();
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    }
  }

  public updateReservationTime(eventInput: EventInput) {
    const dialogRef = this.dialog.open(ReservationTimeUpdateComponent, {
      width: '400px',
      data: {
        id: eventInput.event.id,
        userId: this.userToken.sub,
        userName: eventInput.event.extendedProps.userName,
        meetingRoomName: eventInput.event.extendedProps.meetingRoomName,
        meetingRoomId: eventInput.event.extendedProps.meetingRoomId,
        start: eventInput.event.start,
        end: eventInput.event.end,
        title: eventInput.event.title,
        summary: eventInput.event.extendedProps.summary
      },
    });
    dialogRef.componentInstance.closeOutput.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calendarEvents = [];
        this.getReservationsByMeetingRoom();
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.getReservationsByMeetingRoom();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public selectable() {
    if (this.checked || !this.meetingRoom || this.isReader) {
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
          let editableEvent: boolean = false;
          if (reservation.user?.id === this.userToken.sub) {
            editableEvent = true;
          }
          this.calendarEvents.push(
            {
              id: reservation.id,
              userId: reservation.user?.id,
              userName: reservation.user?.username,
              meetingRoomName: reservation.meetingRoom?.name,
              meetingRoomId: reservation.meetingRoom?.id,
              end: reservation.endingTime,
              overlap: false,
              start: reservation.startingTime,
              title: reservation.title,
              summary: reservation.summary,
              editable: editableEvent
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
              userId: reservation.user?.id,
              userName: reservation.user?.username,
              meetingRoomName: reservation.meetingRoom?.name,
              meetingRoomId: reservation.meetingRoom?.id,
              end: reservation.endingTime,
              overlap: false,
              start: reservation.startingTime,
              title: reservation.title,
              summary: reservation.summary,
            }
          );
        }
      }
    );
  }

}
