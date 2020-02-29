import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
    table {
      width: 100%;
    }
    .check {
      align: left;
    }
  `],
  template: `
  <div class="row justify-content-center" class="container">
  <button  mat-icon-button color="primary"
          (click)="openDialog()">
          <mat-icon>add</mat-icon>
  </button>
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
     <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
     <ng-container matColumnDef="checkbox">
      <th mat-header-cell *matHeaderCellDef class="column">
        <button mat-icon-button color="primary" (click)="deleteByCheckbox()">
          <mat-icon class="check">delete</mat-icon>
        </button>
      </th>
        <td mat-cell *matCellDef="let meetingRoom">
          <mat-checkbox (change)="checkCheckBox(meetingRoom.id, $event)"></mat-checkbox>
        </td>
        </ng-container>
     <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef class="column">{{'meeting-room.text' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.name}} {{meetingRoom.id}} </td>
        </ng-container>
        <ng-container matColumnDef="numberOfSeat">
          <th mat-header-cell *matHeaderCellDef class="column">
            {{'meeting-room.seats' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom"> {{meetingRoom.numberOfSeats}} </td>
        </ng-container>
        <ng-container matColumnDef="projector">
            <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
              {{'meeting-room.projector' | translate}} </th>
            <td mat-cell *matCellDef="let meetingRoom">
            <mat-icon color="primary"
              *ngIf="meetingRoom.projector!==true">
              clear
            </mat-icon>
            <mat-icon class="projector-color" *ngIf="meetingRoom.projector===true">done</mat-icon>
        </ng-container>
        <ng-container matColumnDef="buildingName">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'meeting-room.buildingName' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            {{meetingRoom.building?.buildingName}}</td>
        </ng-container>
       <ng-container matColumnDef="building">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'meeting-room.building' | translate}} </th>
          <td mat-cell *matCellDef="let meetingRoom">
            {{meetingRoom.building?.city}} - {{meetingRoom.building?.address}}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef class="column"></th>
          <td mat-cell *matCellDef= "let meetingRoom">
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
      <mat-paginator
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButton>
      </mat-paginator>
    </div>
  `
})
export class MeetingRoomComponent implements OnInit, OnDestroy, AfterViewInit {

  public displayedColumns: string[] = ['checkbox', 'name', 'numberOfSeat', 'projector', 'building', 'delete'];
  public dataSource: MatTableDataSource<MeetingRoom> = new MatTableDataSource<MeetingRoom>();
  public dataSub: Subscription;
  public unsubFromDialog: Subscription;
  public unsubFromDelete: Subscription;
  public unsubFromUpdate: Subscription;
  public unsubFromCheckbox: Subscription;
  public meetingRoom: MeetingRoom;
  public checkedArr: number[] = [];
  public editCb: boolean;
  public isChecked: boolean = false;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly dialog: MatDialog,
              private readonly meetingRoomService: MeetingRoomService
              ) { }

  public checkCheckBox(Id: number, event: MatCheckboxChange) {
   const checked = event.checked;
   if (checked) {
    this.checkedArr.push(Id);
   } else {
    const index = this.checkedArr.findIndex((meetingRoom) => meetingRoom === Id);
    this.checkedArr.splice(index, 1);
   }
  }

  public deleteByCheckbox() {
    this.unsubFromCheckbox = this.meetingRoomService.deleteMeetingRoomByCheckBox((this.checkedArr))
    .subscribe(() => {
      this.meetingRoomService.deleteMeetingRoomByCheckBox(this.checkedArr);
      this.meetingRoomService.getAllMeetingRooms();
      }
    );
    this.checkedArr = [];
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
      width: '400px',
    });
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(MeetingRoomDeleteComponent, {
      height: '35%',
      width: '30%'
    });
    this.unsubFromDelete = dialogRef.afterClosed()
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
