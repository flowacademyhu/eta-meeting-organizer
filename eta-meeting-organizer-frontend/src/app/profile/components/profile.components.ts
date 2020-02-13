import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  styles: [`
    .card {
      margin-top: 20rem;
      margin-left: 7rem;
      width: 30rem;
      background-color: #f44336;
      color: white;
      border-radius: 5%;
    }
  `],
  template: `
    <mat-card class="card">
      <h2>{{'profile.username' | translate}}:</h2>
      <h2>{{'profile.lastName' | translate}}:</h2>
      <h2>{{'profile.firstName' | translate}}:</h2>
      <h2>{{'profile.email' | translate}}:</h2>
      <h2>{{'profile.role' | translate}}:</h2>
      <button mat-raised-button color="primary">{{'profile.delete' | translate}}</button>
    </mat-card>
  `
})

export class ProfileComponent implements OnInit {
  public language: string;

  constructor(private readonly translate: TranslateService) {
    this.language = this.translate.currentLang;
  }

  ngOnInit() {
  }

}
