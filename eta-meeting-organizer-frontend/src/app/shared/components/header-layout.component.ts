import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  styles: [`
    .email{
      font-size: 12px;
    }
    `,
  ],
  template: `
  <mat-toolbar class="my-0" color="primary" >
  <p class="mr-3"><img src="../../../assets/wysio_arrow.png" height="55" /></p>
  <a class="mr-3" mat-stroked-button routerLink="/first">{{'navbar.calendar' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/second">{{'navbar.meetingRoomEditor' | translate}}</a>
  <a class="mr-3" mat-stroked-button routerLink="/profile">{{'navbar.profile' | translate}}</a>
  <button mat-button class="ml-auto"(click)="onLanguageChange()">{{'header.button' | translate}}</button>
  <p class="email">kolbaszjoska@citromail.hu</p>
  <button mat-stroked-button class="ml-2">
    <mat-icon>logout</mat-icon>
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
