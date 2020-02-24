import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Building } from '~/app/models/building.model';
import { BuildingService } from './../services/building.service';

@Component({
  selector: 'app-building-update-dialog',
  template: `
  <div mat-dialog-content>
  <form [formGroup]="buildingForm" (ngSubmit)="onSubmit()">
  <mat-form-field>
      <mat-label>{{'building.buildingName' | translate}}</mat-label>
        <input matInput type="text" name="buildingName" 
        formControlName="buildingName" [(ngModel)]="building.buildingName">
    </mat-form-field>
    <mat-form-field>
      <mat-label>{{'building.city' | translate}}</mat-label>
        <input matInput type="text" name="city" formControlName="city" [(ngModel)]="building.city">
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.address' | translate}}</mat-label>
        <input matInput type="text" name="address" formControlName="address" [(ngModel)]="building.address">
        </mat-form-field>
    <div>
      <button mat-button mat-dialog-close>Mégse</button>
      <button mat-button mat-dialog-close type="submit" cdkFocusInitial>Mentés</button>
    </div>
  </form>
</div>`,
})

export class BuildingUpdateDialogComponent implements OnInit {
  public building: Building = {} as Building;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private readonly buildingService: BuildingService) { }

  ngOnInit() {
    console.log(this.data)
    this.buildingService.getOneBuilding(this.data)
    .subscribe((res) => {
      console.log(res);
      this.building = res;
    });
  }

  public buildingForm: FormGroup = new FormGroup({
    city: new FormControl(),
    address: new FormControl(),
    buildingName: new FormControl(),
  });

  public onSubmit() {
    console.log(this.building);
    this.buildingService
    .updateBuilding(this.data, this.building)
    .subscribe(() => 
    this.buildingService
    .getAllBuildings());
  }

}
