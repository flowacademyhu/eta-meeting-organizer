import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-verification-dialog',
  styles: [`
    .align-title {
      padding-top: 5%;
      margin: 0 auto;
      font-size: 200%;
      text-align: center;
    }
    .align-content, mat-option {
      font-size: 150%;
      margin: 0 auto;
      text-align: center;
    }
    mat-form-field {
      width: 80%;
      text-align: center;
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
  <mat-dialog-content class="align-title">{{'user-verification-dialog.roleSetting' | translate}}</mat-dialog-content>
  <mat-dialog-content class="align-content">
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
     <button mat-raised-button mat-dialog-close={{choosenRole}} color="primary" [disabled]="!choosenRole"
    (click)="openSnackBar()">{{'user-verification-dialog.setRole' | translate}}</button>
  </mat-dialog-actions>
  <br>
  <mat-dialog-actions>
     <button mat-raised-button mat-dialog-close=undefined
     color="accent">{{'user-verification-dialog.cancel' | translate}}</button>
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
