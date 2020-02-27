import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Building } from '~/app/models/building.model';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { BuildingService } from '../services/building.service';
import { MeetingRoomService } from './../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-register',
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
<!-- város kilistázás -->
     <mat-form-field>
       <mat-label>{{'building.city' | translate}}</mat-label>
       <mat-select (selectionChange)="getBuildings()" formControlName="city">
         <mat-option *ngFor="let city of cities" [value]="city" >{{city}}</mat-option>
       </mat-select>
     </mat-form-field>

<!-- címek kilistázása -->
     <mat-form-field>
       <mat-label>{{'building.address' | translate}}</mat-label>
         <mat-select (selectionChange)="getMeetingRooms()"formControlName="building">
           <mat-option *ngFor="let building of buildings" [value]="building">{{building.address}}</mat-option>
         </mat-select>
     </mat-form-field>

<!-- tárgyaló neve -->
     <mat-form-field>
       <mat-label>{{'meeting-room.text' | translate}}</mat-label>
         <input type="text" name="name" formControlName="name"
           matInput placeholder="{{'meeting-room.text' | translate}}">
           <mat-error>{{'validation.validate' | translate}}</mat-error>
     </mat-form-field>
     <br>

<!-- űlőhelyek száma -->
     <mat-form-field>
       <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
         <input  type="number" name="numberOfSeats" formControlName="numberOfSeats"
           matInput placeholder="{{'meeting-room.seats' | translate}}">
           <mat-error>{{'validation.validate' | translate}}</mat-error>
     </mat-form-field>

<!-- projector -->
     <br>
     <div align="left">
       <br>
       <mat-slide-toggle formControlName="projector" ngDefaultControl [(ngModel)]="checked">
         {{'meeting-room.projector' | translate}}
       </mat-slide-toggle>
     </div>

<!-- gombok -->
     <div class="space">
       <button mat-stroked-button mat-dialog-close style="float: left; color: primary;" >cancel</button>
       <button mat-stroked-button mat-dialog-close type="submit" style="float: right;" [disabled]="meetingForm.invalid"
         (click)="openSnackBar() "backgroundcolor="primary">
         Ok
       </button>
     </div>
   </form>
 </div>
 `
})

export class MeetingRoomRegisterComponent implements OnInit {
  @Input()
  public cities: string[];
  public buildings: Building[];
  public meetingRooms: MeetingRoom[];
  public meetingRoom: MeetingRoom;
  public checked: boolean = false;
  public meetingF: FormGroup;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
    private meetingRoomService: MeetingRoomService,
    private buildigService: BuildingService,
    private readonly translate: TranslateService,
  ) {}

  public ngOnInit() {
    this.buildigService.findAllCities()
      .subscribe((data) => {
        this.cities = data;
      });
  }

  public meetingForm: FormGroup = new FormGroup({
    building: new FormControl(undefined, Validators.required),
    city : new FormControl(undefined, Validators.required),
    name : new FormControl(undefined, Validators.required),
    numberOfSeats : new FormControl(undefined, Validators.required),
    projector : new FormControl(),
  });

  public getBuildings() {
    this.buildigService.findByCity(this.meetingForm.controls.city.value)
      .subscribe((data) => {
        this.buildings = data;
      });
  }

  public getMeetingRooms() {
    this.meetingRoomService
    .findByBuildingId(this.meetingForm.controls.building.value.id)
      .subscribe((data) => {
        this.meetingRooms = data;
        this.changeDetectorRef.detectChanges();
      });
  }

  public onSubmit() {
    this.meetingRoomService
      .postMeetingRoom(this.meetingForm.getRawValue())
      .subscribe((data) => {
        this.meetingRoom = data;
        this.meetingRoomService.getAllMeetingRooms();
      });
    if (this.meetingForm.valid) {
    this.meetingForm.reset();
    }
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`snackbar-meeting-room.registerOk`), '', {
      duration: 2500
    });
  }
}
