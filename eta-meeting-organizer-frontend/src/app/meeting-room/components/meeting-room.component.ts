import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { MeetingRoom } from './../../models/meetingroom.model';
import { MeetingRoomRegisterComponent } from './../../shared/Modals/meeting-room-register.component';

@Component({
  selector: 'app-meeting-room-listing',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }
    table {
      width: 100%;
    }
  `],
  template: `
  <button mat-fab color="primary"
          (click)="openDialog()">
          <i class="material-icons">add</i>
  </button>
    <div class="row justify-content-center">
      <table mat-table [dataSource]="meetingRoom$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>{{'meeting-room.text' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.name}} </td>
        </ng-container>
        <ng-container matColumnDef="numberOfSeat">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.seats' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.numberOfSeats}} </td>
        </ng-container>
        <ng-container matColumnDef="projector">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.projector' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">{{meetingRoom.projector}}</td>
        </ng-container>
        <ng-container matColumnDef="building">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.building' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">{{meetingRoom.building}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let meetingRoom">
          <button mat-raised-button color="accent">
            <i class="material-icons">
            edit
            </i>
            </button>
            <button mat-raised-button color="primary">
            <i class="material-icons">
            delete
            </i>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})

export class MeetingRoomComponent {

  public meetingRoom$: Observable<MeetingRoom[]>;

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog) {
    this.meetingRoom$ = this.api.meetingRoom()
    .getMeetingRooms();
   }
   public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];

   public openDialog(): void {
    this.dialog.open(MeetingRoomRegisterComponent, {
      width: '400px',
    });
  }
}
