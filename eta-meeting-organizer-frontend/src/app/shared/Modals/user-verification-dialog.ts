import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-verification-dialog',
  template: `
  <h2 mat-dialog-title>{{'user-verification-dialog.userVerification' | translate}}</h2>
  <mat-dialog-content>{{'user-verification-dialog.verification' | translate}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'user-verification-dialog.no' | translate}}</button>
    <button mat-raised-button mat-dialog-close="true" color="primary"
    (click)="openSnackBar()">{{'user-verification-dialog.yes' | translate}}</button>
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
