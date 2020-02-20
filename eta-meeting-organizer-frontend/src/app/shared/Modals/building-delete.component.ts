import { Component } from '@angular/core';

@Component({
  selector: 'app-building-delete',
  template: `
 <h2 mat-dialog-title>{{'building-delete.meetingRoomDelete' | translate}}</h2>
  <mat-dialog-content>{{'building-delete.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'building-delete".no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary">{{'building-delete".yes' | translate}}</button>
  </mat-dialog-actions>
`
})

export class BuildingDeleteComponent {

}
