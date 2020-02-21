import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
      <button mat-button mat-dialog-close>{{'building.cancel' | translate}}</button>
      <button mat-button mat-dialog-close type="submit" cdkFocusInitial
      (click)="openSnackBar()">{{'building.saveButton' | translate}}</button>
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
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {}

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

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`post-building-snackbar.post`), undefined, {
      duration: 2500
    });
  }
}
