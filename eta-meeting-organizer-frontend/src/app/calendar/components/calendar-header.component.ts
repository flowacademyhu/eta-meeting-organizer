import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
        <form [formGroup]="meetingRoomSelector" novalidate>
            <mat-form-field>
              <mat-label>Város</mat-label>
              <mat-select
              (selectionChange)="getBuildings()"
              formControlName="city">
                <mat-option *ngFor="let city of cities" [value]="city">{{
                  city
                }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Épület</mat-label>
              <mat-select
              (selectionChange)="getMeetingrooms()"
              formControlName="building">
                <mat-option *ngFor="let building of buildings" [value]="building">{{
                  building.address
                }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Tárgyaló</mat-label>
              <mat-select
              formControlName="meetingRoom"
              [(ngModel)]="meetingRoom">
                <mat-option *ngFor="let meetingRoom of meetingRooms" [value]="meetingRoom">{{
                  meetingRoom.name
                }}</mat-option>
              </mat-select>
            </mat-form-field>
        </form>
          <mat-checkbox [checked]="checked" (change)="onCheck($event)">Saját naptár</mat-checkbox>
    </mat-toolbar>
    <app-calendar
    [meetingRoom]="meetingRoom"
    [checked]=checked
    > </app-calendar>
  `
})
export class CalendarHeaderComponent implements OnInit {
  public checked: boolean = true;

  public cities: string[];

  public buildingId: number;
  public building: Building;
  public buildings: Building[];

  public meetingRoom: MeetingRoom;
  public meetingRooms: MeetingRoom[];

  public meetingRoomSelector: FormGroup = new FormGroup({
      building: new FormControl(),
      city: new FormControl(),
      meetingRoom: new FormControl()
  });

  constructor(private readonly api: ApiCommunicationService, private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.meetingRoomSelector.disable();
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
      .findByCity(this.meetingRoomSelector.controls.city.value)
      .subscribe((data) => {
        this.buildings = data;
      });
  }

  public getMeetingrooms() {
    this.api
      .meetingRoom()
      .findByBuildingId(this.meetingRoomSelector.controls.building.value.id)
      .subscribe((data) => {
        this.meetingRooms = data;
        this.changeDetectorRef.detectChanges();
      });
  }

  public onCheck(event: MatCheckboxChange) {
    if (event.checked) {
      this.meetingRoomSelector.disable();
      this.checked = true;
    } else {
      this.meetingRoomSelector.enable();
      this.checked = false;
    }
    // event.checked ? this.meetingRoomSelector.disable() : this.meetingRoomSelector.enable();
  }

}
