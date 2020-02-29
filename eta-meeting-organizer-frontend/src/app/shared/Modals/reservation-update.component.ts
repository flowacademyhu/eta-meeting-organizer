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
import { EventElement } from '~/app/models/event.model';

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

  @Output()
  public passDataBackToModal: EventEmitter<EventElement> = new EventEmitter();

  public reservations$: Observable<Reservation[]>;
  public reservationBookingForm: FormGroup;
  public reservationToPost: ReservationToPost = {} as ReservationToPost;
  public reservation: Reservation;
  public meetingRoomId: number;
  public newReservation: Reservation = {} as Reservation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventElement,
    public dialogRef: MatDialogRef<ReservationUpdateComponent>,
    private readonly reservationService: ReservationService,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    public datepipe: DatePipe) {}

  public ngOnInit() {
    this.reservationBookingForm = new FormGroup({
    title : new FormControl('', Validators.required ),
    summary : new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    console.log('In submit(reservation-info):', this.data);
    this.reservationToPost.id = Number(this.data.id);
    this.reservationToPost.userId = this.data.userId;
    this.reservationToPost.meetingRoomId = this.data.meetingRoomId;
    this.reservationToPost.startingTime = new Date(this.data.start).valueOf();
    this.reservationToPost.endingTime = new Date(this.data.end).valueOf();
    this.reservationToPost.title = this.data.title;
    this.reservationToPost.summary = this.data.summary;

    this.reservationService.
    updateReservation(Number(this.data.id), this.reservationToPost)
    .subscribe(() => {
      // this.passDataBackToModal.emit(this.data);
      this.dialogRef.close();
    });
  }

  public openSnackBar() {
    this._snackBar.open(this.translate
      .instant(`snackbar-reservation.reservationModificationOK`), '', {
      duration: 2500
    });
  }
}
