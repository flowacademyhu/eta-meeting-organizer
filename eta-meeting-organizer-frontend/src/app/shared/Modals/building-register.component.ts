import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

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
      <button mat-button type="submit" cdkFocusInitial
      (click)="openSnackBar('Meeting room has been saved!')">Ok</button>
    </div>
  </form>
</div>`,
})

export class BuildingRegisterComponent implements OnInit {

  public building$: Observable<Building>;
  public buildingForm: FormGroup;
  public building: Building;
  public subs: Subscription;
  constructor(
    public dialogRef: MatDialogRef<BuildingRegisterComponent>,
    private readonly api: ApiCommunicationService,
    private readonly _snackBar: MatSnackBar) {}

    public ngOnInit() {
      this.buildingForm = new FormGroup({
      address : new FormControl('', Validators.required ),
      city : new FormControl('', Validators.required),
      });
    }

  public onSubmit() {
    this.api.building()
      .postBuilding(this.buildingForm.getRawValue())
      .subscribe((data) => {
        this.building = data;
      });
    if (this.buildingForm.valid) {
      this.buildingForm.reset();
    }
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, '' , { duration: 3000});
    }
}
