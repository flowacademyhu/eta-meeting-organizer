import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user-delete-dialog',
  styles: [`
    .align-title {
      padding-top: 7%;
      margin: 0 auto;
      font-size: 250%;
      text-align: center;
    }
    .align-content {
      font-size: 170%;
      margin: 0 auto;
      text-align: center;
    }
    button {
      margin-top: 15%;
      width: 80%;
      margin: 0 auto;
      border:0.5px solid;
      border-color: black
    }
  `],
  template: `
  <mat-dialog-content class="align-title">{{'user-delete-dialog.userDelete' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">{{'user-delete-dialog.verification' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="true" color="primary"
    (click)="openSnackBar()">{{'user-delete-dialog.yes' | translate}}</button>
    </mat-dialog-actions>
    <br>
    <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">{{'user-delete-dialog.no' | translate}}</button>
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
