import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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
  <button mat-raised-button mat-dialog-close="true" color="primary" (click)="openSnackBar()">
    {{'meeting-room-delete.yes' | translate}}
    </button>
    </mat-dialog-actions>
    <br>
    <mat-dialog-actions >
    <button mat-raised-button mat-dialog-close="false" color="accent">{{'meeting-room-delete.no' | translate}}</button>
    </mat-dialog-actions>
  `
})

export class MeetingRoomDeleteComponent {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {}

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`meeting-room-delete.deleted`), '', {
      duration: 2500
    });
  }
}
