import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Building } from '~/app/models/building.model';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-calendar-header',
  styles: [
    `
      .toolbar {
        min-height: 75px;
      }
    `,
  ],
  template: `
    <mat-toolbar color="primary">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
          <div formGroupName="meetingRoomSelector" novalidate>
            <mat-form-field>
              <mat-label>Város</mat-label>
              <mat-select 
              (selectionChange)="getBuildings()"
              formControlName="city"
              [disabled]="checked"
              [(ngModel)]="city">
                <mat-option *ngFor="let city of cities" [value]="city">{{
                  city
                }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Épület</mat-label>
              <mat-select 
              (selectionChange)="getMeetingrooms()"
              formControlName="building"
              [disabled]="checked"
              [(ngModel)]="building">
                <mat-option *ngFor="let building of buildings" [value]="building">{{
                  building.address
                }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Tárgyaló</mat-label>
              <mat-select formControlName="meetingRoom">
                <mat-option *ngFor="let meetingRoom of meetingRooms" [value]="meetingRoom">{{
                  meetingRoom.name
                }}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </form>
          <mat-checkbox [(ngModel)]="checked">Saját naptár</mat-checkbox>
    </mat-toolbar>
    <app-calendar> </app-calendar>
  `
})
export class CalendarHeaderComponent implements OnInit {
  public checked: boolean = true;

  public city: string;
  public cities: string[];

  public buildingId: number;
  public building: Building;
  public buildings: Building[];

  public meetingRooms: MeetingRoom[];
  public contactForm: FormGroup;

  constructor(private readonly api: ApiCommunicationService) {
    this.contactForm = this.createFormGroup();
  }

  public createFormGroup() {
    return new FormGroup({
      meetingRoomSelector: new FormGroup({
        building: new FormControl(),
        city: new FormControl(),
        meetingRoom: new FormControl()
      })
    });
  }

  public ngOnInit() {
    this.api
      .building()
      .getCities()
      .subscribe((data) => {
        this.cities = data;
      });
  }

  public getBuildings() {
    this.api
      .building()
      .findByCity(this.city)
      .subscribe((data) => {
        this.buildings = data;
      });
  }

  public getMeetingrooms() {
    this.api
      .meetingRoom()
      .findByBuildingId(this.building.id)
      .subscribe((data) => {
        this.meetingRooms = data;
      });
  }

}
