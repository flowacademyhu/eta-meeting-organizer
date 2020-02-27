import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Building } from '~/app/models/building.model';
import { BuildingService } from './../services/building.service';

@Component({
  selector: 'app-building-update-dialog',
  template: `
  <div mat-dialog-content>
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
    <div>
      <button mat-button mat-dialog-close>{{'building.cancel' | translate}}</button>
      <button mat-button mat-dialog-close type="submit" cdkFocusInitial [disabled]="buildingForm.invalid"
      (click)="openSnackBar()">{{'building.update' | translate}}</button>
    </div>
  </form>
</div>`,
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
