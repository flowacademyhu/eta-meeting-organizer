import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MeetingRoomService } from '../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-checkbox-delete',
  styles: [`
    .align-title {
      padding-top: 7%;
      margin: 0 auto;
      font-size: 250%;
      text-align: center;
    }
    .align-content {
      font-size: 170%;
      margin: 0 auto;
      text-align: center;
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
  <mat-dialog-actions >
  <button mat-raised-button mat-dialog-close="true" color="primary" (click)="deleteByCheckbox()">
  {{'meeting-room-delete.delete' | translate}}
  </button>
  </mat-dialog-actions>
  <br>
  <mat-dialog-actions >
  <button mat-raised-button mat-dialog-close="false" color="accent">
    {{'meeting-room-delete.cancel' | translate}}
  </button>
  </mat-dialog-actions>
  `
})

export class MeetingRoomCheckboxComponent {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private  id: number[],
    public dialogRef: MatDialogRef<MeetingRoomCheckboxComponent>,
    private readonly meetingRoomService: MeetingRoomService) {}

    public deleteByCheckbox() {
    this.meetingRoomService.deleteMeetingRoomByCheckBox((this.id))
      .subscribe(() => {
        this.meetingRoomService.deleteMeetingRoomByCheckBox(this.id);
        this.meetingRoomService.getAllMeetingRooms();
        this.dialogRef.close();
        }, () => {
          this.errorSnackbar();
        });
    this.id = [];
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
