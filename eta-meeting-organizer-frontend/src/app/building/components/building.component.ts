import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-building',
  styles: [`
    .row {
      min-height: calc(100vh - 60vh);
    }
    .field{
      min-width: calc(100vh - 60vh);
    }
  `],
  template: `
    <div class="row justify-content-center align-items-center">
      <form [formGroup]="profileForm">
        <mat-card class="card">
          <p>
          <mat-form-field class="field">
            <mat-label>{{'building.city' | translate}}</mat-label>
            <input type="text" formControlName="city" matInput placeholder="{{'building.city' | translate}}">
          </mat-form-field>
          </p>
          <p>
          <mat-form-field class="field">
            <mat-label>{{'building.address' | translate}}</mat-label>
            <input  type="text" formControlName="address" matInput placeholder="{{'building.address' | translate}}">
          </mat-form-field>
          </p>
          <button mat-raised-button color="warn">{{'building.saveButton' | translate}}</button>
        </mat-card>
      </form>
    </div>
  `
})

export class BuildingComponent {

  profileForm = new FormGroup({
    address : new FormControl(''),
    city : new FormControl(''),
  });
}
