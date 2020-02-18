import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { MeetingRoom } from './../../models/meetingroom.model';
import { MeetingRoomDeleteComponent } from './../../shared/Modals/meeting-room-delete.component';
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
    .addButton {
      width: 100%;
    }
  `],
  template: `
  <button mat-raised-button color="warn"
          class="addButton"
          (click)="openDialog()">
          {{'meeting-room.add' | translate}}
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
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.delete' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            <button mat-raised-button color="warn" (click)="deleteDialog(meetingRoom.id)">
              {{'meeting-room.delete' | translate}}</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})

export class MeetingRoomComponent implements OnInit, OnDestroy{

  public meetingRoom$: Observable<MeetingRoom[]>;
  public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];
  public unsubFromDialog: Subscription;

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog) { }

  public ngOnInit() {
    this.api.meetingRoom()
      .getMeetingRooms();
    this.meetingRoom$ = this.api.meetingRoom()
      .meetingRoomSub;
  }

   public openDialog(): void {
    this.dialog.open(MeetingRoomRegisterComponent, {
      width: '400px',
    });
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomDeleteComponent);
    this.unsubFromDialog = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteMeetingRoom(id);
      }
    });
  }

  public ngOnDestroy() {
    this.unsubFromDialog.unsubscribe();
  }

  public deleteMeetingRoom(id: number) {
    this.api.meetingRoom()
    .deleteMeetingRoomById(id)
    .subscribe(() => {
      this.api.meetingRoom()
      .getMeetingRooms();
    });
  }
}
