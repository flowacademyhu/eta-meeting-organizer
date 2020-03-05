import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Participant } from '~/app/models/participant.model';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ReservationEmailListComponent } from './reservation-email-list.component';

@Component({
  selector: 'app-reservation-book',
  styles: [`
  .align-title {
    padding-top: 5%;
    padding-bottom: 3%;
    margin: 0 auto;
    font-size: 225%;
    text-align: center;
  }
  p {
    font-size: 75% !important;
    color: #e64b3a;
  }
  .align-content{
    height: 90%;
    font-size: 160%;
    margin: 0 auto;
    text-align: center;
  }
  mat-form-field {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  button {
    width: 85%;
    margin: 0 auto;
    border:1px solid;
    border-color: black;
    font-size: 100%;
  }
  textarea {
    rows: 4;
  }
`],
 template: `
 <mat-dialog-content
 class="align-title">{{'reservation.head' | translate}}</mat-dialog-content>
 <mat-dialog-content class="align-content">
   <form [formGroup]="reservationBookingForm" id="reservationBookingForm" (ngSubmit)="onSubmit()">
     <mat-form-field>
       <mat-label>{{'reservation.title' | translate}}</mat-label>
         <input type="text" name="title" formControlName="title" maxlength="20"
          matInput placeholder="{{'reservation.title' | translate}}">
          <br>
          <mat-error>{{'validation.validate' | translate}}</mat-error>
     </mat-form-field>
     <br>
     <mat-form-field>
       <mat-label>{{'reservation.summary' | translate}}</mat-label>
       <textarea matInput name="summary" formControlName="summary" rows="9" maxlength="255"
       placeholder="{{'reservation.summary' | translate}}"></textarea>
         <br>
           <mat-error>{{'validation.validate' | translate}}</mat-error>
       </mat-form-field>
       <p *ngIf="this.errorMessage == 'validate.reservation.reserved'">
        {{'reservation-error-messages.post' | translate}}</p>
     <br>
     </form>

       <button
       mat-raised-button
       [disabled]="reservationBookingForm.invalid"
       color="primary"
       (click)="openEmailModal()"
       >{{'reservation.participantButton' | translate}}</button>
       <br>
       <br>
       <mat-dialog-actions>
       <button
       mat-raised-button
       type="submit"
       form="reservationBookingForm"
       [disabled]="reservationBookingForm.invalid"
       color="primary"
       >{{'reservation.reserve' | translate}}</button>
       </mat-dialog-actions>
       <br>
       <mat-dialog-actions>
       <button
       mat-raised-button
       mat-dialog-close
       color="accent"
       >{{'reservation.cancel' | translate}}</button>
       </mat-dialog-actions>
</mat-dialog-content>
`,
})

export class ReservationBookingComponent implements OnInit {
  @Input()
  public checked: boolean = true;

  @Output()
  public passEntry: EventEmitter<undefined> = new EventEmitter();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public reservations$: Observable<Reservation[]>;
  public reservationBookingForm: FormGroup;
  public reservation: ReservationToPost;
  public meetingRoomId: number;
  public newReservation: Reservation = {} as Reservation;
  public participants: Participant[] = [];
  public errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReservationToPost,
    public dialogRef: MatDialogRef<ReservationBookingComponent>,
    private readonly dialog: MatDialog,
    private readonly reservationService: ReservationService,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    public datepipe: DatePipe) {
      dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
      });
  }

  public ngOnInit() {
    this.reservationBookingForm = new FormGroup({
    title : new FormControl('', Validators.required),
    summary : new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.data.title = this.reservationBookingForm.controls.title.value;
    this.data.summary = this.reservationBookingForm.controls.summary.value;
    this.data.startingTime = new Date(this.data.startingTime as number).valueOf();
    this.data.endingTime = new Date(this.data.endingTime as number).valueOf();
    this.data.participants = this.participants;
    console.log(this.data);
    this.reservationService.
    postReservation(this.data)
    .subscribe(() => {
      this.openSnackBar();
      this.dialogRef.close();
    }, (error) => {
      this.errorMessage = error.error;
      this.errorSnackBar();
    });
  }

  public openEmailModal() {
    const dialogRef = this.dialog.open(ReservationEmailListComponent, {
      height: '80%',
      width: '420px',
      data: {
        participants: this.participants
      }
    });
    dialogRef.componentInstance.closeOutput.pipe(takeUntil(this.destroy$))
      .subscribe((participants) => {
        this.participants = participants;
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  public openSnackBar() {
    this._snackBar.open(this.translate
      .instant(`snackbar-reservation.reservationOk`), '', {
      duration: 2500
    });
  }

  public errorSnackBar() {
    this._snackBar.open(this.translate.instant(`reservation-error-messages.error`), '', {
      duration: 2500
    });
  }
}
