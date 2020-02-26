import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user-delete-dialog',
  template: `
  <h2 mat-dialog-title>{{'user-delete-dialog.userDelete' | translate}}</h2>
  <mat-dialog-content>{{'user-delete-dialog.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'user-delete-dialog.no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary"
    (click)="openSnackBar()">{{'user-delete-dialog.yes' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class UserDeleteDialogComponent {
  constructor(private readonly snackBar: MatSnackBar, private readonly translate: TranslateService) {}
  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`delete-user-snackbar.delete`), undefined, {
      duration: 2500
    });
  }
}
