import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BuildingService } from './../services/building.service';

@Component({
  selector: 'app-building-checkbox-delete',
  styles: [`
    .align-title {
      padding-top: 7%;
      margin: 0 auto;
      font-size: 225%;
      text-align: center;
    }
    .align-content {
      font-size: 160%;
      margin: 0 auto;
      text-align: center;
    }
    p {
    font-size: 125%;
    margin: 0 auto;
    color: #e64b3a;
    text-align:center;
  }
    button {
      margin-top: 15%;
      width: 80%;
      margin: 0 auto;
      border:1px solid;
      border-color: black;
      font-size: 130%;
    }
  `],
  template: `
  <mat-dialog-content class="align-title">{{'building-delete-dialog.buildingDelete' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">{{'building-delete-dialog.verification' | translate}}</mat-dialog-content>
  <br>
  <p>{{'building-delete-dialog.warning' | translate}}</p>
  <mat-dialog-actions >
  <button mat-raised-button color="primary" (click)="deleteByCheckbox()">
  {{'meeting-room-delete.delete' | translate}}
  </button>
  </mat-dialog-actions>
  <br>
  <mat-dialog-actions >
  <button mat-raised-button mat-dialog-close="false" color="accent">
    {{'meeting-room-delete.cancel' | translate}}
  </button>
  </mat-dialog-actions>
  `
})

export class BuildingCheckboxComponent {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private  id: number[],
    public dialogRef: MatDialogRef<BuildingCheckboxComponent>,
    private readonly buildingService: BuildingService) {}

    public deleteByCheckbox() {
    this.buildingService.deleteBuildingByCheckBox((this.id))
      .subscribe(() => {
        this.buildingService.deleteBuildingByCheckBox(this.id);
        this.buildingService.getAllBuildings();
        this.dialogRef.close();
        }, () => {
          this.errorSnackbar();
        });
    this.id = [];
    }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`meeting-room-delete.deleted`), '', {
      duration: 2500
    });
  }

  public errorSnackbar() {
    this.snackBar.open(this.translate.instant(`building-delete-dialog.fail`), undefined, {
      duration: 2500
    });
  }
}
