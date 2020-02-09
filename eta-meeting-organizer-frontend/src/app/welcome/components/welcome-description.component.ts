import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '~/app/models/placeholder-user.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-welcome-description',
  template: `
    <mat-toolbar color="primary" class="my-5">
      {{'welcome.text' | translate}}
      <button color="accent" mat-raised-button class="ml-auto"
              (click)="onLanguageChange()">{{'welcome.button' | translate}}</button>
    </mat-toolbar>

    <mat-card *ngFor="let user of (users$ | async)" class="my-2">
      <strong>{{user.name}}</strong><br>
      {{user.email}}<br>
      {{user.address.city}} - {{user.address.zipcode}} - {{user.address.street}} - {{user.address.suite}}<br>
      {{user.phone}}<br>
      {{user.website}}<br>
    </mat-card>
  `
})

export class WelcomeDescriptionComponent {
  public language: string;

  public users$: Observable<User[]>;

  constructor(private readonly translate: TranslateService,
              private readonly api: ApiCommunicationService) {
    this.language = this.translate.currentLang;
    this.users$ = this.api.welcome()
                          .testGet();
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
}
