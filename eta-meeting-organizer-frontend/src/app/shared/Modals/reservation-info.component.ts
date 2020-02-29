import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventElement } from '~/app/models/event.model';
import { ReservationService } from '../services/reservation.service';
import { ReservationDeleteComponent } from './reservation-delete.component';
import { ReservationUpdateComponent } from './reservation-update.component';

@Component({
  selector: 'app-reservation-info',
  styles: [`
  .align-title {
    padding-top: 5%;
    padding-bottom: 5%;
    height: 150px;
    margin: 0 auto;
    font-size: 250%;
    text-align: center;
  }
  .align-content{
    height: 10cm;
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
  `],
 template: `
<mat-dialog-content class="align-title">{{'reservation.summary' | translate}}</mat-dialog-content>
  <mat-dialog-content class="align-content">
      <mat-label>{{'reservation.meetingroom' | translate}}</mat-label>
        {{ data.meetingRoomName }}
    <br>
      <mat-label>{{'reservation.title' | translate}}</mat-label>
        {{ data.title }}
    <br>
      <mat-label>{{'reservation.summary' | translate}}</mat-label>
        {{ data.summary }}
    <br>
      <mat-label>{{'reservation.startDate' | translate}}</mat-label>
        {{ data.start | date : 'y.MM.dd. HH:mm'}}
    <br>
      <mat-label>{{'reservation.endDate' | translate}}</mat-label>
        {{ data.end | date : 'y.MM.dd. HH:mm'}}
    <mat-dialog-actions>
    <button mat-raised-button
      (click)="updateDialog()" color="primary">{{'reservation.modify' | translate}}</button>
    </mat-dialog-actions>
      <br>
    <mat-dialog-actions>
      <button mat-raised-button color="accent"
      (click)="close()">{{'reservation.cancel' | translate}}</button>
    </mat-dialog-actions>
      <br>
    <mat-dialog-actions>
      <button mat-raised-button color="warn"
      (click)="deleteDialog()">{{'reservation.delete' | translate}}</button>
    </mat-dialog-actions>
</mat-dialog-content>`,
})

export class ReservationInfoComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public deleteUnsub: Subscription;

  @Output()
  public closeOutput: EventEmitter<undefined> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventElement,
    public dialogRef: MatDialogRef<ReservationInfoComponent>,
    public datepipe: DatePipe,
    private readonly dialog: MatDialog,
    private readonly reservationService: ReservationService) {
      dialogRef.backdropClick()
      .subscribe(() => {
        this.close();
      });
  }

  public close() {
    this.dialogRef.close();
    this.closeOutput.emit();
  }

  public updateDialog() {
    const dialogRef = this.dialog.open(ReservationUpdateComponent, {
      width: '400px',
      data: this.data
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  public deleteDialog() {
    const dialogRef = this.dialog.open(ReservationDeleteComponent);
    this.deleteUnsub = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteReservation();
      }
    });
  }

  public deleteReservation() {
    this.reservationService.deleteReservation(Number(this.data.id))
    .subscribe(() => {
    this.closeOutput.emit();
    this.dialogRef.close();
    });
  }
}
