import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingService } from '~/app/shared/services/building.service';

@Component({
  selector: 'app-building-register',
  styles: [`
  .mat-dialog-content{
    display: flex;
    justify-content: center;
    height: 200px;
  }
  `],
  template: `
<div mat-dialog-content>
  <form [formGroup]="buildingForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <mat-label>{{'building.city' | translate}}</mat-label>
        <input type="text" name="city" formControlName="city" matInput placeholder="{{'building.city' | translate}}">
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.address' | translate}}</mat-label>
        <input  type="text" name="address" formControlName="address"
          matInput placeholder="{{'building.address' | translate}}">
        </mat-form-field>
    <div>
      <button mat-button [mat-dialog-close] >cancel</button>
      <button mat-button type="submit" cdkFocusInitial>Ok</button>
    </div>
  </form>
</div>`,
})

export class BuildingRegisterComponent implements OnInit {

  public building$: Observable<Building[]>;
  public buildingForm: FormGroup;
  public building: Building;
  public subs: Subscription;
  constructor(
    public dialogRef: MatDialogRef<BuildingRegisterComponent>,
    private readonly buildingService: BuildingService) {}

    public ngOnInit() {
      this.buildingService.getAllBuildings();
      this.building$ = this.buildingService
      .buildingSub;
      this.buildingForm = new FormGroup({
      address : new FormControl('', Validators.required ),
      city : new FormControl('', Validators.required),
      });
    }

  public onSubmit() {
    this.buildingService.
      postBuilding(this.buildingForm.getRawValue())
      .subscribe((data) => {
        this.building = data;
        this.buildingService.getAllBuildings();
      });
  }
}
