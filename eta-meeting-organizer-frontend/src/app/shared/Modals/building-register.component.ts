import {HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Building } from '~/app/models/building.model';
import { BuildingService } from './../services/building.service';

@Component({
  selector: 'app-building-register',
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
  p {
    font-size: 65% !important;
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
  <mat-dialog-content class="align-title">{{'building.post' | translate}}</mat-dialog-content>
    <br>
  <mat-dialog-content class="align-content">
    <form [formGroup]="buildingForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <mat-label>{{'building.buildingName' | translate}}</mat-label>
        <input type="text" name="city" formControlName="buildingName"
         matInput placeholder="{{'building.buildingName' | translate}}">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
      <p *ngIf="this.errorMessage === 'No message available'"> Foglalt épület</p>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.city' | translate}}</mat-label>
        <input type="text" name="city" formControlName="city" matInput placeholder="{{'building.city' | translate}}">
        <mat-error>{{'validation.validate' | translate}}</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'building.address' | translate}}</mat-label>
        <input  type="text" name="address" formControlName="address"
          matInput placeholder="{{'building.address' | translate}}">
         <mat-error>{{'validation.validate' | translate}}</mat-error>
      <p *ngIf="this.errorMessage === 'No message available'"> Foglalt cím</p>
    </mat-form-field>
      <mat-dialog-actions>
        <button mat-raised-button type="submit" [disabled]="buildingForm.invalid"
        color="primary">{{'building.saveButton' | translate}}</button>
      </mat-dialog-actions>
        <br>
      <mat-dialog-actions>
        <button mat-raised-button mat-dialog-close color="accent">{{'building.cancel' | translate}}</button>
      </mat-dialog-actions>
  </form>
</mat-dialog-content>`,
})

export class BuildingRegisterComponent implements OnInit {

  public buildingForm: FormGroup;
  public building: Building;
  public errorMessage: string = '';
  constructor(
    public dialogRef: MatDialogRef<BuildingRegisterComponent>,
    private readonly buildingService: BuildingService,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {}

    public ngOnInit() {
      this.buildingForm = new FormGroup({
      address : new FormControl(undefined, Validators.required),
      city : new FormControl(undefined, Validators.required),
      buildingName: new FormControl(undefined, Validators.required),
      });
    }

  public onSubmit() {
    this.buildingService
      .postBuilding(this.buildingForm.getRawValue())
      .subscribe((data: Building) => {
        this.building = data;
        this.buildingService.getAllBuildings();
        this.openSnackBar();
        this.dialogRef.close();
      }, (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.errorSnackBar();
      });
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`post-building-snackbar.post`), '', {
      duration: 2500
    });
  }

  public errorSnackBar() {
    this.snackBar.open(this.translate.instant(`error-buildingPost-snackbar.error`), '', {
      duration: 2500
    });
  }
}
