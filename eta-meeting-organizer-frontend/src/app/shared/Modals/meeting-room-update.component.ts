import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { MeetingRoomService } from '../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-update',
  styles: [`
  .mat-dialog-content{
    display: flex;
    justify-content: center;
    height: 380px;
  }
  .mat-form-field {
    width:340px;
  }
  .space{
    margin-top: 20%;
  }
  `],
 template: `
  <div mat-dialog-content>
    <form [formGroup]="meetingForm" (ngSubmit)="onSubmit()" align="center">

<!-- tárgyaló neve -->
      <mat-form-field>
        <mat-label>{{'meeting-room.text' | translate}}</mat-label>
          <input type="text" name="name" formControlName="name"
            matInput placeholder="{{'meeting-room.text' | translate}}" [(ngModel)]="meetingRoom.name">
      </mat-form-field>
      <br>

<!-- űlőhelyek száma -->
      <mat-form-field>
        <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
          <input  type="number" name="numberOfSeats" formControlName="numberOfSeats"
          [(ngModel)]="meetingRoom.numberOfSeats"
            matInput placeholder="{{'meeting-room.seats' | translate}}">
      </mat-form-field>

<!-- projector -->
      <br>
      <div align="left">
        <br>
        <mat-slide-toggle formControlName="projector" ngDefaultControl [(ngModel)]="meetingRoom.projector">
          {{'meeting-room.projector' | translate}}
        </mat-slide-toggle>
      </div>

<!-- gombok -->
      <div class="space">
        <button mat-stroked-button mat-dialog-close style="float: left; color: primary;" >cancel</button>
        <button mat-stroked-button mat-dialog-close type="submit" style="float: right;"
          (click)="openSnackBar() "backgroundcolor="primary">
          Ok
        </button>
      </div>
    </form>
  </div>
  `
})

export class MeetingRoomUpdateComponent implements OnInit {
  @Input()
  public meetingRooms: MeetingRoom[];
  public meetingRoom: MeetingRoom = {} as MeetingRoom;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private meetingRoomService: MeetingRoomService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public ngOnInit() {
    this.meetingRoomService.getOneMeetingRoom(this.data)
    .subscribe((res) => {
      this.meetingRoom = res;
    });
  }

  public meetingForm: FormGroup = new FormGroup({
    name : new FormControl(''),
    numberOfSeats : new FormControl(''),
    projector : new FormControl(''),
  });

  public onSubmit() {
    this.meetingRoomService
      .updateMeetingRoom(this.data, this.meetingRoom)
      .subscribe(() => {
      this.meetingRoomService.getAllMeetingRooms();
      });
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`meeting-room-update.update`), '', {
      duration: 2500
    });
  }
}
