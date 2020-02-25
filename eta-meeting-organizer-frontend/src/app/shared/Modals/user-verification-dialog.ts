import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-verification-dialog',
  template: `
  <h2 mat-dialog-title>Felhasználói szerepkör megadása</h2>
  <mat-dialog-content>
  <mat-form-field appearance="fill">
    <mat-label>Szerepkörök</mat-label>
    <mat-select [(value)]="choosenRole">
      <mat-option value="ADMIN">ADMIN</mat-option>
      <mat-option value="USER">USER</mat-option>
      <mat-option value="READER">READER</mat-option>
    </mat-select>
  </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close>Mégse</button>
    <button mat-raised-button mat-dialog-close={{choosenRole}} color="primary"
    (click)="openSnackBar()">Szerepkör beállítása</button>
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
