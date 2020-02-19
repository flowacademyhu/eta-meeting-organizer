import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  styles: [`
    .card {
      border-radius: 5%;
    }
    .row {
      min-height: calc(100vh - 60px);
    }
  `],
  template: `
  <div class="row justify-content-center align-items-center">
    <div class="col-4">
    <mat-card class="card">
      <button mat-raised-button color="primary">{{'profile.delete' | translate}}</button>
    </mat-card>
    </div>
 </div>
  `
})

export class ProfileComponent {

  // tslint:disable-next-line: no-empty
  constructor() {}
}
