import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meeting-room-delete',
  template: `
  <h3 md-dialog-title>{{'meeting-room-delete.meetingRoomDelete' | translate}}</h3>
  <mat-dialog-content>
  {{'meeting-room-delete.verification' | translate}}
  </mat-dialog-content>
  <mat-dialog-actions >
    <button mat-stroked-button mat-dialog-close="false">{{'meeting-room-delete.no' | translate}}</button>
    <button mat-stroked-button mat-dialog-close="true" color="primary" (click)="openSnackBar()">
    {{'meeting-room-delete.yes' | translate}}
    </button>
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
