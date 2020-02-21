import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { MeetingRoomService } from './../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-register',
  styles: [`
  .mat-dialog-content{
    display: flex;
    justify-content: center;
    height: 300px;
  }
  .space{
    margin-top: 20%;
  }
  `],
 template: `
 <div mat-dialog-content>
   <form [formGroup]="meetingRoomForm" (ngSubmit)="onSubmit()">
     <mat-form-field>
       <mat-label>{{'meeting-room.text' | translate}}</mat-label>
         <input type="text" name="name" formControlName="name"
          matInput placeholder="{{'meeting-room.text' | translate}}">
     </mat-form-field>
     <br>
     <mat-form-field>
       <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
         <input  type="number" name="numberOfSeats" formControlName="numberOfSeats"
           matInput placeholder="{{'meeting-room.seats' | translate}}">
       </mat-form-field>
     <br>
     <mat-slide-toggle [checked]="checked" formControlName="projector">{{'meeting-room.projector' | translate}}
     </mat-slide-toggle>

     <div class="space">
       <button mat-button [mat-dialog-close]>cancel</button>
       <button mat-button type="submit" cdkFocusInitial value="reset">Ok</button>
     </div>
   </form>
 </div>`,
})

export class MeetingRoomRegisterComponent implements OnInit {
  @Input()
  public checked: boolean = true;
  public meetingRoom$: Observable<MeetingRoom[]>;
  public meetingRoomForm: FormGroup;
  public meetingRoom: MeetingRoom;

  constructor(
    public dialogRef: MatDialogRef<MeetingRoomRegisterComponent>,
    private readonly meetingRoomService: MeetingRoomService) {
    }

    public ngOnInit() {
      this.meetingRoomForm = new FormGroup({
      name : new FormControl('', Validators.required ),
      numberOfSeats : new FormControl('', Validators.required),
      projector : new FormControl('', Validators.required),
      });
    }

  public onSubmit() {
    this.meetingRoomService.
    postMeetingRoom(this.meetingRoomForm.getRawValue())
    .subscribe((data) => {
        this.meetingRoom = data;
        this.meetingRoomService.getAllMeetingRooms();
      });
  }
}
