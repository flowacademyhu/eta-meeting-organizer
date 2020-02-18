import { Component } from '@angular/core';

@Component({
  selector: 'app-meeting-room-delete',
  template: `
 <h2 mat-dialog-title>{{'meeting-room-delete.meetingRoomDelete' | translate}}</h2>
  <mat-dialog-content>{{'meeting-room-delete.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'meeting-room-delete.no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary">{{'meeting-room-delete.yes' | translate}}</button>
  </mat-dialog-actions>
`
})


export class MeetingRoomDeleteComponent {

}
