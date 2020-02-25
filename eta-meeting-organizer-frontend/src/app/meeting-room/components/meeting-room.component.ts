import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
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
    }
  `],
  template: `
  <button mat-icon-button color="primary"
          (click)="openDialog()">
          <mat-icon>add</mat-icon>
  </button>
  <div>
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
     <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef  mat-sort-header>{{'meeting-room.text' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.name}} </td>
        </ng-container>
        <ng-container matColumnDef="numberOfSeat">
          <th mat-header-cell *matHeaderCellDef  mat-sort-header> {{'meeting-room.seats' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.numberOfSeats}} </td>
        </ng-container>
        <ng-container matColumnDef="projector">
          <th mat-header-cell *matHeaderCellDef  mat-sort-header> {{'meeting-room.projector' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">{{meetingRoom.projector}}</td>
        </ng-container>
       <ng-container matColumnDef="building">
          <th mat-header-cell *matHeaderCellDef> {{'meeting-room.building' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            {{meetingRoom.building.city}} - {{meetingRoom.building.address}}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let meetingRoom">
          <button mat-icon-button color="accent">
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
export class MeetingRoomComponent implements OnInit, OnDestroy, AfterViewInit {

  public meetingRoom$: Observable<MeetingRoom[]>;

  public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog,
              private readonly meetingRoomService: MeetingRoomService) {
                this.meetingRoom$ = this.api.meetingRoom()
                                            .getMeetingRooms();
  }

  public dataSource: MatTableDataSource<MeetingRoom> = new MatTableDataSource<MeetingRoom>();

  public dataSub: Subscription;
  public unsubFromDialog: Subscription;

  public ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSub = this.meetingRoomService.getAllMeetingRoom()
      .subscribe((res) => {
        this.dataSource.data = (res as unknown as MeetingRoom[]);
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
     .toLocaleLowerCase();
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

  public deleteMeetingRoom(id: number) {
    this.meetingRoomService.deleteMeetingRoom(id)
    .subscribe(() => {
      this.meetingRoomService
      .getAllMeetingRooms();
    });
  }

  public ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    if (this.unsubFromDialog) {
      this.unsubFromDialog.unsubscribe();
    }
  }
}
