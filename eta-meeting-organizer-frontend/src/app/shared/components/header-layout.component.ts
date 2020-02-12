import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '~/app/models/placeholder-user.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-header',
  styles: [`
    .header{

      position: fixed;
      top: 0px;
      text-align: center;
      position: fixed;
      z-index:999;
      font-size: smaller;
      align-items: center;
      padding: 8px;
      position: sticky;
      bottom:0;
      background: #333333;
      }

    .fill-remaining-space{
    flex: 1 1 auto;
    position: absolute;
    }


  .white{
    color:white;
    text-align: center;
  }
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    }
  `],
  template: `
  <mat-grid-tile-header>
  <mat-toolbar class="header">
    <mat-toolbar-row >
      <h1>
        <img src="../../../assets/wysio_arrow.png" height="50" />
      </h1>
      <h1 class="white">
      {{'header.text' | translate}}
      </h1>
      <button color="error" mat-raised-button class="ml-auto"
              (click)="onLanguageChange()">{{'header.button' | translate}}</button>
              <div class="">
            <a mat-button (click)="logout()" class="white">
              Kilépés
            </a>
      </div>

    </mat-toolbar-row>
  </mat-toolbar>
</mat-grid-tile-header>
`
})

export class HeaderComponent {
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
