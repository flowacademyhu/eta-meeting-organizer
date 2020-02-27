import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-verification-dialog',
  template: `
  <h2 mat-dialog-title>{{'user-verification-dialog.roleSetting' | translate}}</h2>
  <mat-dialog-content>
  <mat-form-field>
    <mat-label>{{'user-verification-dialog.roles' | translate}}</mat-label>
    <mat-select [(value)]="choosenRole">
      <mat-option value="ADMIN">{{'user-verification-dialog.admin' | translate}}</mat-option>
      <mat-option value="USER">{{'user-verification-dialog.user' | translate}}</mat-option>
      <mat-option value="READER">{{'user-verification-dialog.reader' | translate}}</mat-option>
    </mat-select>
  </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close>{{'user-verification-dialog.cancel' | translate}}</button>
    <button mat-raised-button mat-dialog-close={{choosenRole}} color="primary"
    (click)="openSnackBar()">{{'user-verification-dialog.setRole' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class UserVerificationDialogComponent {
  constructor(private readonly snackBar: MatSnackBar, private readonly translate: TranslateService) {}
  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`verification-snackbar.verify`), undefined, {
      duration: 2500
    });
  }
}
