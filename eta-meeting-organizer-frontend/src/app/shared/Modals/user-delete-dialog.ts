import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { MeetingRoomDeleteComponent } from './meeting-room-delete.component';

@Component({
  selector: 'app-user-delete-dialog',
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
  <mat-dialog-content class="align-title">{{'user-delete-dialog.userDelete' | translate}}</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">{{'user-delete-dialog.verification' | translate}}</mat-dialog-content>
  <br>
  <p>{{'user-delete-dialog.warning' | translate}}</p>
  <mat-dialog-actions>
    <button mat-raised-button color="primary"
    (click)="deleteUser('true')">{{'user-delete-dialog.delete' | translate}}</button>
    </mat-dialog-actions>
    <br>
    <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false" color="accent">
      {{'user-delete-dialog.cancel' | translate}}</button>
  </mat-dialog-actions>
  `
})

export class UserDeleteDialogComponent {
  constructor(private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) private readonly id: string,
              public dialogRef: MatDialogRef<MeetingRoomDeleteComponent>,
              private readonly userService: UserService) {}

  public deleteUser(choice: string) {
    if (choice === 'true') {
      this.userService.deleteUser(this.id)
      .subscribe(() => {
        this.openSnackBar();
        this.userService.getAllUsers();
        this.dialogRef.close();
      }, () => {
        this.errorSnackbar();
      });
    }
  }

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`delete-user-snackbar.delete`), undefined, {
      duration: 2500
    });
  }

  public errorSnackbar() {
    this.snackBar.open(this.translate.instant(`user-delete-dialog.fail`), undefined, {
      duration: 2500
    });
  }
}
