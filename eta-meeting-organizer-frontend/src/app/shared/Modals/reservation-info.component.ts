import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventElement } from '~/app/models/event.model';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationUpdateComponent } from './reservation-update.component';

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
 <mat-list>
  <mat-list-item>{{'reservation.title' | translate}} {{data.title}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.summary' | translate}} {{data.summary}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.startDate' | translate}}
  {{data.start | date : 'y.MM.dd. hh:mm'}}</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>{{'reservation.endDate' | translate}} {{data.end | date : 'y.MM.dd. hh:mm'}}</mat-list-item>
</mat-list>
<br>
</div>
<button mat-raised-button (click)="update()">Módosítás</button>
<button mat-raised-button (click)="close()">Ok</button>
 `,
})

export class ReservationInfoComponent {
  @Input()
  public checked: boolean = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Output()
  public closeOutput: EventEmitter<undefined> = new EventEmitter();

  public reservations$: Observable<Reservation[]>;
  public reservationBookingForm: FormGroup;
  public reservation: ReservationToPost;
  public meetingRoomId: number;
  public newReservation: Reservation = {} as Reservation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventElement,
    public dialogRef: MatDialogRef<ReservationInfoComponent>,
    public datepipe: DatePipe,
    private readonly dialog: MatDialog) {
      console.log('In the constructor of reservation-info: ', data);
      dialogRef.disableClose = true;
  }

  public update() {
    const dialogRef = this.dialog.open(ReservationUpdateComponent, {
      width: '400px',
      data: this.data
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  public close() {
    this.dialogRef.close();
    this.closeOutput.emit();
  }
}
