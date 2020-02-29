import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { MeetingRoomService } from '../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-update',
  styles: [`
  .align-title {
    padding-top: 5%;
    padding-bottom: 5%;
    margin: 0 auto;
    font-size: 250%;
    text-align: center;
  }
  .align-content{
    height: 80%;
    font-size: 160%;
    margin: 0 auto;
    text-align: center;
  }
  mat-form-field {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  button {
    width: 80%;
    margin: 0 auto;
    border:1px solid;
    border-color: black;
    font-size: 100%;
  }
`],
 template: `
    <mat-dialog-content class="align-title">{{'building.post' | translate}}</mat-dialog-content>
    <mat-dialog-content class="align-content">
    <form [formGroup]="meetingForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>{{'meeting-room.text' | translate}}</mat-label>
          <input type="text" name="name" formControlName="name"
            matInput placeholder="{{'meeting-room.text' | translate}}" [(ngModel)]="meetingRoom.name">
            <mat-error>{{'validation.validate' | translate}}</mat-error>
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
          <input  type="number" name="numberOfSeats" formControlName="numberOfSeats"
          [(ngModel)]="meetingRoom.numberOfSeats"
            matInput placeholder="{{'meeting-room.seats' | translate}}">
            <mat-error>{{'validation.validate' | translate}}</mat-error>
      </mat-form-field>
      <br>
      <div align="left">
        <mat-slide-toggle formControlName="projector" ngDefaultControl [(ngModel)]="meetingRoom.projector">
          {{'meeting-room.projector' | translate}}
        </mat-slide-toggle>
      </div>
      <br>
      <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close type="submit"
          (click)="openSnackBar()" [disabled]="meetingForm.invalid" color="primary">
          {{'meeting-room.saveButton' | translate}}
        </button>
        </mat-dialog-actions>
        <br>
        <mat-dialog-actions>
          <button mat-raised-button mat-dialog-close color="accent">{{'meeting-room.cancel' | translate}}</button>
        </mat-dialog-actions>
    </form>
  </mat-dialog-content>
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
    name : new FormControl(undefined, Validators.required),
    numberOfSeats : new FormControl(undefined, Validators.required),
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
