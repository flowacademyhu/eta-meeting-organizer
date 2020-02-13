import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  styles: [`
    .card {
      color: #f3f5ed;
      background-color: #e64b3a;
      border-radius: 5%;
    }
    .row {
      min-height: calc(100vh - 60px);
    }
    .button {
      background-color: #333333;
      color: #f3f5ed;
    }
  `],
  template: `
  <div class="row justify-content-center align-items-center">
    <div class="col-6">
    <mat-card class="card">
      <h2>{{'profile.username' | translate}}:</h2>
      <h2>{{'profile.lastName' | translate}}:</h2>
      <h2>{{'profile.firstName' | translate}}:</h2>
      <h2>{{'profile.email' | translate}}:</h2>
      <h2>{{'profile.role' | translate}}:</h2>
      <button mat-raised-button class="button">{{'profile.delete' | translate}}</button>
    </mat-card>
    </div>
 </div>
  `
})

export class ProfileComponent implements OnInit {
  constructor() { }

  ngOnInit() {
}

}
