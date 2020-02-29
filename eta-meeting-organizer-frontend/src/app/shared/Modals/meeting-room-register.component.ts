import {HttpErrorResponse} from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Building } from '~/app/models/building.model';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import {BuildingRegisterComponent} from '~/app/shared/Modals/building-register.component';
import { BuildingService } from '../services/building.service';
import { MeetingRoomService } from './../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room-register',
  styles: [`
  .align-title {
    padding-top: 5%;
    padding-bottom: 5%;
    margin: 0 auto;
    font-size: 225%;
    text-align: center;
  }
  .align-content{
    height: 95%;
    font-size: 160%;
    margin: 0 auto;
    text-align: center;
  }
  mat-option {
      font-size: 150%;
      margin: 0 auto;
      text-align: center;
  }
  mat-form-field {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  p {
    font-size: 70% !important;
    color: #e64b3a;
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
<mat-dialog-content class="align-title">{{'meeting-room.post' | translate}}</mat-dialog-content>
<mat-dialog-content class="align-content">
   <form [formGroup]="meetingForm" (ngSubmit)="onSubmit()">
     <mat-form-field>
       <mat-label>{{'building.city' | translate}}</mat-label>
       <mat-select (selectionChange)="getBuildings()" formControlName="city">
         <mat-option *ngFor="let city of cities" [value]="city" >{{city}}</mat-option>
       </mat-select>
     </mat-form-field>
     <mat-form-field>
       <mat-label>{{'building.address' | translate}}</mat-label>
         <mat-select (selectionChange)="getMeetingRooms()"formControlName="building">
           <mat-option *ngFor="let building of buildings" [value]="building">{{building.address}}</mat-option>
         </mat-select>
     </mat-form-field>
     <mat-form-field>
       <mat-label>{{'meeting-room.text' | translate}}</mat-label>
         <input type="text" name="name" formControlName="name"
           matInput placeholder="{{'meeting-room.text' | translate}}">
           <mat-error>{{'validation.validate' | translate}}</mat-error>
     </mat-form-field>
     <p *ngIf="this.errorMessage === 'No message available'">
       {{'error-meeting-roomPost-snackbar.name' | translate}}</p>
     <br>
     <mat-form-field>
       <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
         <input  type="number" min="0" required="true" name="numberOfSeats" formControlName="numberOfSeats"
           matInput placeholder="{{'meeting-room.seats' | translate}}">
           <mat-error>{{'validation.validate' | translate}}</mat-error>
     </mat-form-field>
     <br>
     <div align="left">
       <br>
       <mat-slide-toggle formControlName="projector" ngDefaultControl [(ngModel)]="checked">
         {{'meeting-room.projector' | translate}}
       </mat-slide-toggle>
     </div>
     <br>
     <mat-dialog-actions>
     <button mat-raised-button type="submit" color="primary"[disabled]="meetingForm.invalid">
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

export class MeetingRoomRegisterComponent implements OnInit {
  @Input()
  public cities: string[];
  public buildings: Building[];
  public meetingRooms: MeetingRoom[];
  public meetingRoom: MeetingRoom;
  public checked: boolean = false;
  public errorMessage: string = '';
  public meetingF: FormGroup;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BuildingRegisterComponent>,
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
        this.openSnackBar();
        this.dialogRef.close();
      }, (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.errorSnackBar();
      });
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`snackbar-meeting-room.registerOk`), '', {
      duration: 2500
    });
  }

  public errorSnackBar() {
    this.snackBar.open(this.translate.instant(`error-meeting-roomPost-snackbar.error`), '', {
      duration: 2500
    });
  }
}
