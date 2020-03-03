import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Building } from '~/app/models/building.model';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { Role } from '~/app/models/user.model';
import { UserToken } from '~/app/shared/models/user-token.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-calendar-header',
  styles: [`
    .toolbar {
      min-height: 48px;
      max-height: 30px;
      display: flex;
      margin-bottom: 10px;
    }
    .select {
      padding-right: 15px;
    }
    .selector {
      display: flex;
      justify-content: center;
    }
`],
  template: `
    <mat-toolbar class="my-1" color="primary" class="toolbar">
      <form [formGroup]="meetingRoomSelector" novalidate>
        <mat-form-field class="select">
          <mat-label>{{'calendar-header.city' | translate}}</mat-label>
            <mat-select (selectionChange)="getBuildings()" formControlName="city">
              <mat-option *ngFor="let city of cities" [value]="city">
                {{city}}
              </mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field class="select">
          <mat-label>{{'calendar-header.building' | translate}}</mat-label>
              <mat-select (selectionChange)="getMeetingrooms()" formControlName="building">
                <mat-option *ngFor="let building of buildings" [value]="building">
                  {{building.address}}
                </mat-option>
              </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{'calendar-header.meeting-room' | translate}}</mat-label>
            <mat-select formControlName="meetingRoom" [(ngModel)]="meetingRoom">
              <mat-option>
                  <p align="center">--</p>
              </mat-option>
              <mat-option *ngFor="let meetingRoom of meetingRooms" [value]="meetingRoom">
                {{meetingRoom.name}}
              </mat-option>
            </mat-select>
        </mat-form-field>
      </form>
      <mat-slide-toggle
        *ngIf="!isReader"
        labelPosition="before" class="ml-auto"
        [checked]="checked"
        (change)="onCheck($event)">
        {{'calendar-header.own-appointments' | translate}}
      </mat-slide-toggle>
    </mat-toolbar>
    <app-calendar [meetingRoom]="meetingRoom" [checked]=checked>
  </app-calendar>
  `
})
export class CalendarHeaderComponent implements OnInit, OnDestroy {
  public checked: boolean = true;
  public cities: string[];
  public buildingId: number;
  public building: Building;
  public buildings: Building[];
  public meetingRoom: MeetingRoom;
  public meetingRooms: MeetingRoom[];
  protected user: UserToken = {} as UserToken;
  protected isReader: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public meetingRoomSelector: FormGroup = new FormGroup({
    building: new FormControl(),
    city: new FormControl(),
    meetingRoom: new FormControl()
  });

  constructor(private readonly api: ApiCommunicationService,
              private changeDetectorRef: ChangeDetectorRef,
              private readonly authService: AuthService) {
    this.authService.user.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.user = data;
      });
    this.checkReader();
  }

  protected checkReader(): void {
    (this.user.role === Role.READER) ? this.isReader = true : this.isReader = false;
  }

  public ngOnInit() {
    if (this.isReader) {
      this.checked = false;
      this.meetingRoomSelector.enable();
    } else {
      this.meetingRoomSelector.disable();
    }
    this.api
      .building()
      .getCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.cities = data;
      });
  }

  public getBuildings() {
    this.api
      .building()
      .findByCity(this.meetingRoomSelector.controls.city.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.buildings = data;
      });
  }

  public getMeetingrooms() {
    this.api
      .meetingRoom()
      .findByBuildingId(this.meetingRoomSelector.controls.building.value.id)
      .pipe(takeUntil(this.destroy$))
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
