import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-building-delete-dialog',
  template: `
  <h2 mat-dialog-title>{{'building-delete-dialog.buildingDelete' | translate}}</h2>
  <mat-dialog-content>{{'building-delete-dialog.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'building-delete-dialog.no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary"
    (click)="openSnackBar()">{{'building-delete-dialog.yes' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class BuildingDeleteDialogComponent {
  constructor(private readonly snackBar: MatSnackBar, private readonly translate: TranslateService) {}
  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`delete-building-snackbar.delete`), undefined, {
      duration: 2500
    });
  }
}
