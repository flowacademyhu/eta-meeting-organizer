import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  styles: [`
    .card {
      margin-top: 25%;
      margin-left: 25%;
      width: 50%;
      background-color: #e64b3a;
      color: #f3f5ed;
      border-radius: 5%;
      padding: 3%;
    }
    .button {
      background-color: #333333;
      color: #f3f5ed;
    }
  `],
  template: `
    <mat-card class="card">
      <h2>{{'profile.username' | translate}}:</h2>
      <h2>{{'profile.lastName' | translate}}:</h2>
      <h2>{{'profile.firstName' | translate}}:</h2>
      <h2>{{'profile.email' | translate}}:</h2>
      <h2>{{'profile.role' | translate}}:</h2>
      <button mat-raised-button class="button">{{'profile.delete' | translate}}</button>
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
