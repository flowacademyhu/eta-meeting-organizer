import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-book',
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
          matInput placeholder="{{'reservation.title' | translate}}">
     </mat-form-field>
     <br>
     <mat-form-field>
       <mat-label>{{'reservation.summary' | translate}}</mat-label>
         <input  type="text" name="summary" formControlName="summary"
           matInput placeholder="{{'reservation.summary' | translate}}">
       </mat-form-field>
     <br>
     <div class="space">
       <button mat-button [mat-dialog-close]>Ok</button>
       <button mat-button type="submit" cdkFocusInitial
       (click)="openSnackBar()">Cancel</button>
     </div>
   </form>
 </div>`,
})

export class ReservationBookingComponent implements OnInit {
  @Input()
  public checked: boolean = true;

  public reservations$: Observable<Reservation[]>;
  public reservationBookingForm: FormGroup;
  public reservation: Reservation;
  public meetingRoomId: number;

  constructor(
    public dialogRef: MatDialogRef<ReservationBookingComponent>,
    private readonly reservationService: ReservationService,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService) {
  }

  public ngOnInit() {
    this.reservationBookingForm = new FormGroup({
    title : new FormControl('', Validators.required ),
    summary : new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.reservationService.
    postReservation(this.reservationBookingForm.getRawValue())
    .subscribe((data) => {
        this.reservation = data;
        this.reservationService.findByMeetingRoomId(this.meetingRoomId);
    });
  }

  public openSnackBar() {
    this._snackBar.open(this.translate
      .instant(`snackbar-meeting-room.registerOk`), '', {
      duration: 2500
    });
  }
}
