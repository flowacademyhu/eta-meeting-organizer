import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Building } from '~/app/models/building.model';
import { BuildingService } from './../services/building.service';

@Component({
  selector: 'app-building-update-dialog',
  styles: [`
  .align-title {
    padding-top: 5%;
    padding-bottom: 5%;
    margin: 0 auto;
    font-size: 250%;
    text-align: center;
  }
  .align-content{
    height: 80%;
    font-size: 160%;
    margin: 0 auto;
    text-align: center;
  }
  mat-form-field {
    width: 100%;
    text-align: center;
    margin: 0 auto;
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
  <mat-dialog-content class="align-title">{{'building.edit' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">
  <form [formGroup]="buildingForm" (ngSubmit)="onSubmit()">
  <mat-form-field>
      <mat-label>{{'building.buildingName' | translate}}</mat-label>
        <input matInput type="text" name="buildingName" formControlName="buildingName">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.city' | translate}}</mat-label>
        <input matInput type="text" name="city" formControlName="city">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.address' | translate}}</mat-label>
        <input matInput type="text" name="address" formControlName="address">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
        </mat-form-field>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close type="submit" [disabled]="buildingForm.invalid"
      (click)="openSnackBar()" color="primary">{{'building.update' | translate}}</button>
    </mat-dialog-actions>
      <br>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close color="accent">{{'building.cancel' | translate}}</button>
    </mat-dialog-actions>
  </form>
</mat-dialog-content>`,
})

export class BuildingUpdateDialogComponent implements OnInit {
  public building: Building = {} as Building;

  constructor(@Inject(MAT_DIALOG_DATA)
              private readonly buildingData: Building,
              private readonly snackBar: MatSnackBar,
              private readonly buildingService: BuildingService,
              private readonly translate: TranslateService) { }

  public ngOnInit() {
    this.building = this.buildingData;
    this.buildingForm.setValue({
      buildingName: this.building.buildingName,
      city: this.building.city,
      address: this.building.address,
    });
  }

  public buildingForm: FormGroup = new FormGroup({
    city: new FormControl(undefined, Validators.required),
    address: new FormControl(undefined, Validators.required),
    buildingName: new FormControl(undefined, Validators.required),
  });

  public onSubmit() {
    this.building = this.buildingForm.getRawValue();
    this.buildingService
    .updateBuilding(this.buildingData.id, this.building)
    .subscribe(() =>
    this.buildingService
    .getAllBuildings());
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`update-building-snackbar.update`), '', {
      duration: 2500
    });
  }

}
