import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EventElement } from '~/app/models/event.model';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-time-update',
  styles: [`
  .align-title {
    padding-top: 5%;
    margin: 0 auto;
    font-size: 250%;
    text-align: center;
  }
  .align-content{
    height: auto;
    font-size: 120%;
    margin: 0 auto;
    text-align: center;
    word-break: break-all;
  }
  p {
    font-size: 75% !important;
    color: #e64b3a;
  }
  button {
    width: 80%;
    margin: 0 auto;
    border:1px solid;
    border-color: black;
    font-size: 100%;
  }
  mat-label {
    font-weight: bold;
  }
  `],
 template: `
<mat-dialog-content  cdkDrag cdkDragRootElement=".cdk-overlay-pane"
class="align-title">{{'reservation-time-change-dialog.head' | translate}}</mat-dialog-content>
<mat-dialog-content class="align-content">
  <mat-card class="align-content">
    <div class="data">
      <mat-label>{{'reservation.title' | translate}}</mat-label>
      <br>
      {{ data.title }}
      <br>
      <mat-divider></mat-divider>
      <br>
      <mat-label>{{'reservation.startDate' | translate}}</mat-label>
      <br>
      {{ data.start | date : 'y.MM.dd. HH:mm'}}
      <br>
      <mat-divider></mat-divider>
      <br>
      <mat-label>{{'reservation.endDate' | translate}}</mat-label>
      <br>
      {{ data.end | date : 'y.MM.dd. HH:mm'}}
</div>
<p *ngIf="this.errorMessage == 'validate.reservation.reserved'">
        {{'reservation-error-messages.update' | translate}}</p>
<mat-dialog-actions>
    <button mat-raised-button
      (click)="updateTime()" color="primary">{{'reservation.modify' | translate}}</button>
    </mat-dialog-actions>
      <br>
    <mat-dialog-actions>
      <button mat-raised-button color="accent"
      (click)="close()">{{'reservation.quit' | translate}}</button>
</mat-dialog-actions>
</mat-card>
</mat-dialog-content>`,
})

export class ReservationTimeUpdateComponent {
  public deleteUnsub: Subscription;
  public errorMessage: string = '';

  @Output()
  public closeOutput: EventEmitter<undefined> = new EventEmitter();

  public reservationToPost: ReservationToPost = {} as ReservationToPost;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventElement,
    public dialogRef: MatDialogRef<ReservationTimeUpdateComponent>,
    public datepipe: DatePipe,
    private readonly reservationService: ReservationService,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {
      dialogRef.backdropClick()
      .subscribe(() => {
        this.close();
      });
  }

  public close() {
    this.closeOutput.emit();
    this.dialogRef.close();
  }

  public updateTime() {
    this.reservationToPost.id = Number(this.data.id);
    this.reservationToPost.userId = this.data.userId;
    this.reservationToPost.meetingRoomId = this.data.meetingRoomId;
    this.reservationToPost.startingTime = new Date(this.data.start).valueOf();
    this.reservationToPost.endingTime = new Date(this.data.end).valueOf();
    this.reservationToPost.title = this.data.title;
    this.reservationToPost.summary = this.data.summary;
    this.reservationToPost.participants = [];
    this.reservationService.
    updateReservation(Number(this.data.id), this.reservationToPost)
    .subscribe(() => {
      this.openSnackBar();
      this.close();
    }, (error) => {
      this.errorMessage = error.error;
      this.errorSnackBar();
    });
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`snackbar-reservation.reservationModificationOK`), undefined, {
      duration: 2500
    });
  }

  public errorSnackBar() {
    this.snackBar.open(this.translate.instant(`reservation-error-messages.updateError`), '', {
      duration: 2500
    });
  }
}
