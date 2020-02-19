import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-verification-dialog',
  template: `
  <h2 mat-dialog-title>{{'user-verification-dialog.userVerification' | translate}}</h2>
  <mat-dialog-content>{{'user-verification-dialog.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'user-verification-dialog.no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary"
    (click)="openSnackBar('User verfied')">{{'user-verification-dialog.yes' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class UserVerificationDialogComponent {
  constructor(private snackbar: MatSnackBar) {}
  public openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {duration: 2000});
  }
}
