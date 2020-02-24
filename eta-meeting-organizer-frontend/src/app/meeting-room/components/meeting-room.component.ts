import { OnInit, Component } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MeetingRoom } from './../../models/meetingroom.model';
import { Page } from './../../models/page';
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
    <div class="mat-elevation-z8">
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
          <button mat-icon-button color="accent" (click)="deleteDialog(meetingRoom.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="primary">
            <mat-icon>delete</mat-icon>
          </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

  <mat-paginator #PAGINATOR
    showFirstLastButtons
    [pageSizeOptions]="[5, 10, 20]"
    [length]="(meetingRoom$ | async)?.totalElements"
    [pageSize]="5"
    [pageIndex]="1"
    (page)="pageEvent = getMeetingRooms($event)"></mat-paginator>

    </div>
  `
})

export class MeetingRoomComponent implements OnInit{
  public meetingRoom$: Observable<Page<MeetingRoom[]>>;
  public displayedColumns: string[] = ['name', 'numberOfSeat', 'projector', 'building', 'delete'];
  public unsubFromDialog: Subscription;

  constructor(private readonly meetingRoomService: MeetingRoomService,
              private readonly dialog: MatDialog) { }

  //@ViewChild(MatPaginator) private paginator: MatPaginator;

  public ngOnInit() {
//    this.paginator.firstPage();
//    this.meetingRoomService.getAllMeetingRooms();
    this.meetingRoom$ = this.meetingRoomService.meetingRoomSub;
    this.meetingRoomService.getAllMeetingRooms(1, 5);

  }

  public getMeetingRooms(event: PageEvent) {
    if (!event) {
      return;
    }

    this.meetingRoomService.getAllMeetingRooms(event.pageIndex, event.pageSize);
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
    this.meetingRoomService.deleteMeetingRoom(id)
    .subscribe(() => {
      this.meetingRoomService
      .getAllMeetingRooms(0, 5);
    });
  }
  }
