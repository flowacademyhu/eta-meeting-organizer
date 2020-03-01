import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BuildingService } from '../services/building.service';

@Component({
  selector: 'app-building-delete-dialog',
  styles: [`
  .align-title {
    padding-top: 5%;
    margin: 0 auto;
    font-size: 250%;
    text-align: center;
  }
  .align-content {
    font-size: 170%;
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
  <mat-dialog-actions>
   <button mat-raised-button color="primary"
    (click)="deleteBuilding('true')">{{'building-delete-dialog.delete' | translate}}</button>
  </mat-dialog-actions>
    <br>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false"
    color="accent">{{'building-delete-dialog.cancel' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class BuildingDeleteDialogComponent {
  constructor(private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) private readonly id: number,
              public dialogRef: MatDialogRef<BuildingDeleteDialogComponent>,
              private readonly buildingService: BuildingService) {}

  public deleteBuilding(choice: string) {
    if (choice === 'true') {
      this.buildingService.deleteBuilding(this.id)
      .subscribe(() => {
        this.openSnackBar();
        this.buildingService.getAllBuildings();
        this.dialogRef.close();
      }, () => {
        this.errorSnackbar();
      });
    }
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`delete-building-snackbar.delete`), undefined, {
      duration: 2500
    });
  }

  public errorSnackbar() {
    this.snackBar.open(this.translate.instant(`building-delete-dialog.fail`), undefined, {
      duration: 2500
    });
  }
}
