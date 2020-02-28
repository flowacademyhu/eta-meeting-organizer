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
  selector: 'app-reservation-update',
  styles: [`
  .mat-dialog-content{
    display: flex;
    justify-content: center;
    height: 300px;
  }
  .space{
    margin-top: 20%;
  }
  `],
 template: `
 <div mat-dialog-content>
   <form [formGroup]="reservationBookingForm" (ngSubmit)="onSubmit()">
     <mat-form-field>
       <mat-label>{{'reservation.title' | translate}}</mat-label>
         <input type="text" name="title" formControlName="title"
          matInput placeholder="{{'reservation.title' | translate}}" [(ngModel)]="data.title">
     </mat-form-field>
     <br>
     <mat-form-field>
       <mat-label>{{'reservation.summary' | translate}}</mat-label>
         <input  type="text" name="summary" formControlName="summary"
           matInput placeholder="{{'reservation.summary' | translate}}" [(ngModel)]="data.summary">
       </mat-form-field>
     <br>
     <div class="space">
       <button
       mat-button
       type="submit"
       [mat-dialog-close]
       cdkFocusInitial
       (click)="openSnackBar()"
       mat-dialog-close>Ok</button>
       <button
       mat-button
       mat-dialog-close
       >Cancel</button>
     </div>
   </form>
 </div>`,
})

export class ReservationUpdateComponent implements OnInit {
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
    public dialogRef: MatDialogRef<ReservationUpdateComponent>,
    private readonly reservationService: ReservationService,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    public datepipe: DatePipe) {
      console.log('data: ', data.summary);
  }

  public ngOnInit() {
    this.reservationBookingForm = new FormGroup({
    title : new FormControl('', Validators.required ),
    summary : new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.data.id = Number(this.data.id);
    this.data.meetingRoomId = Number(this.data.meetingRoomId);
    this.data.title = this.reservationBookingForm.controls.title.value;
    this.data.summary = this.reservationBookingForm.controls.summary.value;
    this.data.startingTime = new Date(this.data.startingTime).valueOf();
    this.data.endingTime = new Date(this.data.endingTime).valueOf();
    console.log('data: ', this.data);
    this.reservationService.
    updateReservation(this.data.id, this.data)
    .subscribe((data) => {
        console.log(data);
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
