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
  <mat-list-item>{{'reservation.meetingroom' | translate}} {{data.meetingRoomName}}</mat-list-item>
  <mat-divider></mat-divider>
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
<button mat-raised-button (click)="close()">{{'reservation.ok' | translate}}</button>
<button mat-raised-button (click)="updateDialog()">{{'reservation.modify' | translate}}</button>
<button mat-raised-button (click)="deleteDialog()">{{'reservation.delete' | translate}}</button>
 `,
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
      dialogRef.disableClose = true;
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
