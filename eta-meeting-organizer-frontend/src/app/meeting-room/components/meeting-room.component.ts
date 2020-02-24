import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MeetingRoomUpdateComponent } from '~/app/shared/Modals/meeting-room-update.component';
import { MeetingRoom } from './../../models/meetingroom.model';
import { MeetingRoomDeleteComponent } from './../../shared/Modals/meeting-room-delete.component';
import { MeetingRoomRegisterComponent } from './../../shared/Modals/meeting-room-register.component';
import { MeetingRoomService } from './../../shared/services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-listing',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }
    table {
      width: 100%;
    },
    .center {
      text-align: center;
      font-size: larger;
    }
  `],
  template: `
  <button  mat-icon-button color="primary"
          (click)="openDialog()">
          <mat-icon>add</mat-icon>
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
            <td mat-cell *matCellDef="let meetingRoom">
            <mat-icon color="primary"
              *ngIf="meetingRoom.projector!==true">
              clear
            </mat-icon>
            <mat-icon class="projector-color" *ngIf="meetingRoom.projector===true">done</mat-icon>
        </ng-container>
        <ng-container matColumnDef="buildingName">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.buildingName' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            {{meetingRoom.building?.buildingName}}</td>
        </ng-container>
       <ng-container matColumnDef="building">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.building' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            {{meetingRoom.building?.city}} - {{meetingRoom.building?.address}}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let meetingRoom">
          <button mat-icon-button color="accent" (click)="updateDialog(meetingRoom.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="deleteDialog(meetingRoom.id)">
            <mat-icon>delete</mat-icon>
          </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class MeetingRoomComponent implements OnInit, OnDestroy {
  public meetingRoom$: Observable<MeetingRoom[]>;
  public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'buildingName', 'building', 'delete'];
  public unsubFromDialog: Subscription;
  public meetingRoom: MeetingRoom;

  constructor(private readonly meetingRoomService: MeetingRoomService,
              private readonly dialog: MatDialog) { }

  public ngOnInit() {
    this.meetingRoomService.getAllMeetingRooms();
    this.meetingRoom$ = this.meetingRoomService.meetingRoomSub;
  }

  public openDialog(): void {
    this.dialog.open(MeetingRoomRegisterComponent, {
      width: '400px',
    });
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomDeleteComponent, {
      height: '250px',
      width: '350px',
    });
    this.unsubFromDialog = dialogRef.afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
        this.deleteMeetingRoom(id);
        }
      });
  }

  public updateDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomUpdateComponent, {
      height: '500px',
      width: '400px',
      data: id
    });
    this.unsubFromDialog = dialogRef.afterClosed()
    .subscribe();
  }

  public ngOnDestroy(): void {
    if (this.unsubFromDialog) {
      this.unsubFromDialog.unsubscribe();
    }
  }

  public deleteMeetingRoom(id: number) {
    this.meetingRoomService.deleteMeetingRoom(id)
      .subscribe(() => {
        this.meetingRoomService.getAllMeetingRooms();
    });
  }
}
