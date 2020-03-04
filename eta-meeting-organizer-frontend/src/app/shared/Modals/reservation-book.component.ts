import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationService } from '../services/reservation.service';

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
    width: 80%;
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
 <mat-dialog-content cdkDrag cdkDragRootElement=".cdk-overlay-pane"
 class="align-title">{{'reservation.head' | translate}}</mat-dialog-content>
 <mat-dialog-content class="align-content">
   <form [formGroup]="reservationBookingForm" (ngSubmit)="onSubmit()">
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
     <br>
     <br>
     <br>
     <mat-dialog-actions>
       <button
       mat-raised-button
       type="submit"
       [mat-dialog-close]
       [disabled]="reservationBookingForm.invalid"
       cdkFocusInitial
       color="primary"
       (click)="openSnackBar()"
       mat-dialog-close>{{'reservation.reserve' | translate}}</button>
       </mat-dialog-actions>
       <br>
       <mat-dialog-actions>
       <button
       mat-raised-button
       mat-dialog-close
       color="accent"
       >{{'reservation.cancel' | translate}}</button>
       </mat-dialog-actions>
   </form>
</mat-dialog-content>
`,
})

export class ReservationBookingComponent implements OnInit {
  @Input()
  public checked: boolean = true;

  @Output()
  public passEntry: EventEmitter<undefined> = new EventEmitter();

  public reservations$: Observable<Reservation[]>;
  public reservationBookingForm: FormGroup;
  public reservation: ReservationToPost;
  public meetingRoomId: number;
  public newReservation: Reservation = {} as Reservation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReservationToPost,
    public dialogRef: MatDialogRef<ReservationBookingComponent>,
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
    this.reservationService.
    postReservation(this.data)
    .subscribe((data) => {
        this.reservation = data;
        this.passEntry.emit();
    });
  }

  public openSnackBar() {
    this._snackBar.open(this.translate
      .instant(`snackbar-reservation.reservationOk`), '', {
      duration: 2500
    });
  }
}
