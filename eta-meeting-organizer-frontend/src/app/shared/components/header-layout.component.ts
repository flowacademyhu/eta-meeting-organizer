import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {ConfigurationService} from '~/app/shared/services/configuration.service';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar class="header" color="primary">
    <mat-toolbar-row >
      <h1>
        <img src="../../../assets/wysio_arrow.png" height="50" />
      </h1>
      <h1 class="white">
      </h1>
      <button color="warn" mat-raised-button class="ml-auto"
              (click)="onLanguageChange()">{{'header.button' | translate}}</button>
              <div>
            <a mat-button *ngIf="checkToken()" (click)="logout()" class="white">
            {{'header.exit' | translate}}
            </a>
      </div>

    </mat-toolbar-row>
  </mat-toolbar>
`
})

export class HeaderComponent {
  public language: string;

  constructor(private readonly translate: TranslateService,
              private readonly configService: ConfigurationService,
              private  readonly router: Router) {
    this.language = this.translate.currentLang;
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }

  protected checkToken() {
    return !!this.configService.fetchToken('accessToken');
  }

  protected logout() {
    this.configService.clearToken();
    this.router.navigate(['']);
  }
}
