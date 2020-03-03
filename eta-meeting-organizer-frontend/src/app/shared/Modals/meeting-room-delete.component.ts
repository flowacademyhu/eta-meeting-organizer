import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MeetingRoomService } from './../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-delete',
  styles: [`
    .align-title {
      padding-top: 7%;
      margin: 0 auto;
      font-size: 225%;
      text-align: center;
    }
    .align-content {
      font-size: 160%;
      margin: 0 auto;
      text-align: center;
    }
    p {
    font-size: 125%;
    margin: 0 auto;
    color: #e64b3a;
    text-align:center;
  }
    button {
      margin-top: 15%;
      width: 80%;
      margin: 0 auto;
      border:1px solid;
      border-color: black;
      font-size: 130%;
    }
  `],
  template: `
  <mat-dialog-content class="align-title">{{'meeting-room-delete.meetingRoomDelete' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">{{'meeting-room-delete.verification' | translate}}</mat-dialog-content>
  <br>
  <p>{{'meeting-room-delete.warning' | translate}}</p>
  <mat-dialog-actions >
  <button mat-raised-button color="primary" (click)="deleteMeetingRoom('true')">
    {{'meeting-room-delete.delete' | translate}}
    </button>
    </mat-dialog-actions>
    <br>
    <mat-dialog-actions >
    <button mat-raised-button mat-dialog-close="false" color="accent">
      {{'meeting-room-delete.cancel' | translate}}</button>
    </mat-dialog-actions>
  `
})

export class MeetingRoomDeleteComponent {
  constructor(
              private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) private readonly id: number,
              public dialogRef: MatDialogRef<MeetingRoomDeleteComponent>,
              private readonly meetingRoomService: MeetingRoomService) {}

  public deleteMeetingRoom(choice: string) {
    if (choice === 'true') {
      this.meetingRoomService.deleteMeetingRoom(this.id)
      .subscribe(() => {
        this.openSnackBar();
        this.meetingRoomService.getAllMeetingRooms();
        this.dialogRef.close();
      }, () => {
        this.errorSnackbar();
      });
    }
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`meeting-room-delete.deleted`), '', {
      duration: 2500
    });
  }

  public errorSnackbar() {
    this.snackBar.open(this.translate.instant(`building-delete-dialog.fail`), undefined, {
      duration: 2500
    });
  }
}
