import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';

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
 <div mat-dialog-content (mouseLeave)="leave()">
 <mat-list>
  <mat-list-item>{{'reservation.title' | translate}} {{data.title}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.summary' | translate}} {{data.summary}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.startDate' | translate}} 
  {{data.startingTime | date : 'y.MM.dd. hh:mm'}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.endDate' | translate}} {{data.endingTime | date : 'y.MM.dd. hh:mm'}}</mat-list-item>
</mat-list>
<button mat-button (click)="update()">Módosítás</button>
 </div>`,
})

export class ReservationMouseoverComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReservationMouseoverComponent>,
    public datepipe: DatePipe) {
  }

  public ngOnInit() {
    console.log('data', this.data);
  }

  public update() {
    this.passEntry.emit();
  }
}
