import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
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
  <a class="mr-3"  routerLink="/calendar"><img src="../../../assets/wysio_arrow.png" height="55" /></a>
  <a class="mr-3" mat-stroked-button routerLink="/calendar">{{'navbar.calendar' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/meetingroom">{{'navbar.meetingRoomEditor' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/profile">{{'navbar.profile' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/building-register">{{'navbar.buildingEditor' | translate}}</a>

  <button mat-button class="ml-auto"(click)="onLanguageChange()">{{'header.button' | translate}}</button>
  <p class="email">kolbaszjoska@citromail.hu</p>
  <button mat-button id="logout" class="ml-2">
  <p><img padding="20" src="../../../assets/logout.png" height="50"/></p>
  </button>
</mat-toolbar>`
})

export class HeaderComponent {
  public language: string;

  constructor(private readonly translate: TranslateService) {
    this.language = this.translate.currentLang;
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
}
