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
  styles: [`
    #row {
  height: 60px;
  position: fixed;
  top: 0px;
  text-align: center;
  position: fixed;
  z-index:999;
  font-size: smaller;
  align-items: center;
  position: sticky;
  }
  .email{
      font-size: 12px;
    }
  #logout{
      padding-top: 15px;
    }
    `,
  ],
  template: `
  <mat-toolbar id="row" class="my-0" color="accent" >
  <p class="mr-3"><img src="../../../assets/wysio_arrow.png" height="55" /></p>
  <a class="mr-3" mat-stroked-button routerLink="/first">{{'navbar.calendar' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/second">{{'navbar.meetingRoomEditor' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/profile">{{'navbar.profile' | translate}}</a>
  <button mat-button class="ml-auto"(click)="onLanguageChange()">{{'header.button' | translate}}</button>
  <p class="email">kolbaszjoska@citromail.hu</p>
  <button mat-button id="logout" class="ml-2">
  <p><img padding="20" src="../../../assets/logout.png" height="50"/></p>
  </button>
</mat-toolbar>`
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
