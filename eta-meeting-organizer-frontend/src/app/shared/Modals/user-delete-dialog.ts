import { Component } from '@angular/core';

@Component({
  selector: 'app-user-delete-dialog',
  template: `
  <h2 mat-dialog-title>Felhasználó törlése</h2>
  <mat-dialog-content>Biztosan törölni akarja a felhasználót?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close="false">Nem</button>
    <button mat-raised-button mat-dialog-close="true" color="primary">Igen</button>
  </mat-dialog-actions>
  `
})

export class UserDeleteDialogComponent {
}
