import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MeetingRoomUpdateComponent } from '~/app/shared/Modals/meeting-room-update.component';
import { MeetingRoom } from './../../models/meetingroom.model';
import { MeetingRoomDeleteComponent } from './../../shared/Modals/meeting-room-delete.component';
import { MeetingRoomRegisterComponent } from './../../shared/Modals/meeting-room-register.component';
import { MeetingRoomService } from './../../shared/services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-listing',
  styles: [`
    .column {
      font-size: larger;
    }
    .column {
      font-size: larger;
    }
    table {
      width: 100%;
      table-layout: fixed;
    }
  `],
  template: `
  <div class="row justify-content-center" class="container">
    <button  mat-icon-button color="primary" (click)="openDialog()">
      <mat-icon>
        add
      </mat-icon>
    </button>
    <mat-form-field>
      <input matInput type="text" (keyup)="doFilter($event.target.value)"
        placeholder="{{'search-bar.search' | translate}}">
    </mat-form-field>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8"
      matSort matSortActive="id" matSortDirection="desc" matSortDisableClears>
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef class="column">
            {{'profile.id' | translate}}
        </th>
        <td mat-cell  *matCellDef="let meetingroom">
          {{meetingroom.id}}
        </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
          {{'meeting-room.text' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          {{meetingRoom.name}}
        </td>
      </ng-container>
      <ng-container matColumnDef="numberOfSeat">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'meeting-room.seats' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          {{meetingRoom.numberOfSeats}}
        </td>
      </ng-container>
      <ng-container matColumnDef="projector">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
          {{'meeting-room.projector' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          <mat-icon color="primary" *ngIf="meetingRoom.projector!==true">
            clear
          </mat-icon>
          <mat-icon class="projector-color" *ngIf="meetingRoom.projector===true">
            done
          </mat-icon>
        </td>
      </ng-container>
      <ng-container matColumnDef="buildingName">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
          {{'meeting-room.buildingName' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          {{meetingRoom.building?.buildingName}}
        </td>
      </ng-container>
      <ng-container matColumnDef="building">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
          {{'meeting-room.building' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          {{meetingRoom.building?.city}} - {{meetingRoom.building?.address}}
        </td>
      </ng-container>
      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef class="column">
          {{'meeting-room.action' | translate}}
        </th>
        <td mat-cell *matCellDef="let meetingRoom">
          <button mat-icon-button color="accent" (click)="updateDialog(meetingRoom.id)">
            <mat-icon>
              edit
            </mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="deleteDialog(meetingRoom.id)">
            <mat-icon>
              delete
            </mat-icon>
          </button>
        </td>
      </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
      <mat-paginator
        [pageSize]="5" class="mat-elevation-z8"
        [pageSizeOptions]="[10, 25, 50]"
        showFirstLastButtons>
      </mat-paginator>
    </div>
  `
})
export class MeetingRoomComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];
  public dataSource: MatTableDataSource<MeetingRoom> = new MatTableDataSource<MeetingRoom>();
  public dataSub: Subscription;
  public unsubFromDialog: Subscription;
  public unsubFromDelete: Subscription;
  public unsubFromUpdate: Subscription;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly dialog: MatDialog,
              private readonly meetingRoomService: MeetingRoomService) {
  }

  public ngOnInit() {
    this.meetingRoomService.getAllMeetingRooms();
    this.dataSource.paginator = this.paginator;
    this.meetingRoomService.meetingRoomSub.subscribe((meetingRooms) => this.dataSource.data = meetingRooms);
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
      disableClose: true,
      height: '85%',
      width: '25%',
    });
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomDeleteComponent, {
      disableClose: true,
      height: '35%',
      width: '30%',
      data: id
    });
    this.unsubFromDelete = dialogRef.afterClosed()
      .subscribe();
  }

  public updateDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomUpdateComponent, {
      disableClose: true,
      height: '65%',
      width: '25%',
      data: id
    });
    this.unsubFromUpdate = dialogRef.afterClosed()
    .subscribe();
  }

  public deleteMeetingRoom(id: number) {
    this.meetingRoomService.deleteMeetingRoom(id)
      .subscribe(() => {
        this.meetingRoomService.getAllMeetingRooms();
    });
  }

  public ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    if (this.unsubFromDelete) {
      this.unsubFromDelete.unsubscribe();
    }
    if (this.unsubFromUpdate) {
      this.unsubFromUpdate.unsubscribe();
    }
    if (this.unsubFromDialog) {
      this.unsubFromDialog.unsubscribe();
    }
  }
}
