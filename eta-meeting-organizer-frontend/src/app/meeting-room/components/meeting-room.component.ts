import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { MeetingRoom } from './../../models/meetingroom.model';

@Component({
  selector: 'app-meetingRoom',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }
    table {
      width: 100%;
    }
  `],
  template: `
    <div class="row justify-content-center">
      <table mat-table [dataSource]="meetingRoom$" class="mat-elevation-z8">
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
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.delete' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            <button mat-raised-button color="warn">{{'meeting-room.delete' | translate}}</button>
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

  constructor(private readonly api: ApiCommunicationService) {
    this.meetingRoom$ = this.api.meetingRoom()
    .getMeetingRooms();
   }
   public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];
   public dataSource = this.meetingRoom$;
}
