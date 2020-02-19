import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar-header',
  styles: [
    `
      .center {
        align-items: center;
      }
    `
  ],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row class="center">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
          <div formGroupName="meetingRoomSelector" novalidate>
            <mat-form-field>
              <mat-label>Város</mat-label>
              <mat-select formControlName="city">
                <mat-option *ngFor="let city of cities" [value]="city">{{
                  city
                }}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </form>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class CalendarHeaderComponent {
  public cities: string[] = ['Szeged', 'Budapest'];
  public contactForm: FormGroup;

  constructor() {
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
}
