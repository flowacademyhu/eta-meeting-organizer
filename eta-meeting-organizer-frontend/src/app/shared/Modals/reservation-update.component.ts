import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { EventElement } from '~/app/models/event.model';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-update',
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
<mat-dialog-content class="align-title">{{'reservation.edit' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">
  <form [formGroup]="reservationUpdateForm" (ngSubmit)="onSubmit()">
  <mat-form-field>
      <mat-label>{{'reservation.title' | translate}}</mat-label>
        <input matInput type="text" name="title" formControlName="title">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'reservation.summary' | translate}}</mat-label>
        <input matInput type="text" name="summary" formControlName="summary">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
    </mat-form-field>
    <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close type="submit"
      (click)="openSnackBar()" color="primary">{{'reservation.modify' | translate}}</button>
    </mat-dialog-actions>
      <br>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close color="accent">{{'reservation.cancel' | translate}}</button>
    </mat-dialog-actions>
  </form>
</mat-dialog-content>`,
})

export class ReservationUpdateComponent implements OnInit {

  public reservationToPost: ReservationToPost = {} as ReservationToPost;

  public reservationUpdateForm: FormGroup = new FormGroup({
    title : new FormControl(''),
    summary : new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventElement,
    public dialogRef: MatDialogRef<ReservationUpdateComponent>,
    private readonly reservationService: ReservationService,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService) {
    }

  public ngOnInit() {
    this.reservationUpdateForm.setValue({
      title: this.data.title,
      summary: this.data.summary,
    });
  }

  public onSubmit() {
    this.data.title = this.reservationUpdateForm.controls.title.value;
    this.data.summary = this.reservationUpdateForm.controls.summary.value;
    this.reservationToPost = new ReservationToPost(Number(this.data.id), this.data.userId, this.data.meetingRoomId,
        new Date(this.data.start).valueOf(), new Date(this.data.end).valueOf(), this.data.title, this.data.summary);
    this.reservationService.
    updateReservation(Number(this.data.id), this.reservationToPost)
    .subscribe(() => {
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
