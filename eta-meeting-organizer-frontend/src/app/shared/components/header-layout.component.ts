import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
            <a mat-button (click)="logout()" class="white">
            {{'header.exit' | translate}}
            </a>
      </div>

    </mat-toolbar-row>
  </mat-toolbar>
`
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
