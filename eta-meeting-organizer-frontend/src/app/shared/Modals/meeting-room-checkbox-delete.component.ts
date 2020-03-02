import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meeting-room-checkbox-delete',
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
      border:1px solid;
      border-color: black;
      font-size: 130%;
    }
  `],
  template: `
  <mat-dialog-content class="align-title">Peti írj ide valamit</mat-dialog-content>
  <br>
  <mat-dialog-content class="align-content">Peti ide is írj valamit</mat-dialog-content>
  <br>
  <mat-dialog-actions >
  <button mat-raised-button mat-dialog-close="true" color="primary" (click)="openSnackBar()">
    törlés
    </button>
    </mat-dialog-actions>
    <br>
    <mat-dialog-actions >
    <button mat-raised-button mat-dialog-close="false" color="accent">no-no</button>
    </mat-dialog-actions>
  `
})

export class MeetingRoomCheckboxComponent {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {}

  public openSnackBar() {
    this.snackBar.open(this.translate.instant(`meeting-room-delete.deleted`), '', {
      duration: 2500
    });
  }
}
