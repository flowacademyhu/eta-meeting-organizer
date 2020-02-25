import { Component, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Role } from '~/app/models/user.model';
import {ConfigurationService} from '~/app/shared/services/configuration.service';
import { UserToken } from '../models/user-token.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  styles: [
    `
      #a {
        width: 160px;
      }
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

  <a class="tool-container mat-elevation-z6" id="a"
  *ngIf="isToken" mat-stroked-button routerLink="/calendar">{{'navbar.calendar' | translate}}</a>
  <a class="tool-container mat-elevation-z6" id="a"
  *ngIf="isAdmin" mat-stroked-button routerLink="/meetingroom">{{'navbar.meetingRoomEditor' | translate}}</a>
  <a class="tool-container mat-elevation-z6" id="a"
  *ngIf="isAdmin" mat-stroked-button routerLink="/users-table">{{'navbar.usersManagement' | translate}}</a>
  <a class="tool-container mat-elevation-z6" id="a"
  *ngIf="isAdmin" mat-stroked-button routerLink="/building-register">{{'navbar.buildingEditor' | translate}}</a>

  <button mat-button class="ml-auto"(click)="onLanguageChange()">{{'header.button' | translate}}</button>
  <p *ngIf="isToken" class="email">{{ user.username }}</p>

  <a *ngIf="isToken" id="logout" (click)="logout()" class="ml-2" style="cursor: pointer;">
  <p><img padding="20" src="../../../assets/logout.png" height="50"/></p>
</a>
</mat-toolbar>`
})

export class HeaderComponent implements OnDestroy {

  public language: string;
  protected user: UserToken = {} as UserToken;
  protected subs: Subscription;
  protected isToken: boolean = false;
  protected isAdmin: boolean = false;

  constructor(private readonly translate: TranslateService,
              private readonly configService: ConfigurationService,
              private  readonly router: Router,
              private readonly authService: AuthService) {
    this.language = this.translate.currentLang;
    this.subs = this.authService.user.pipe(take(1))
    .subscribe((data) => {
      this.user = data;
    });
    this.checkToken();
    this.checkAdmin();
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }

  protected checkToken(): void {
    this.isToken = !!this.configService.fetchToken('accessToken');
  }

  protected checkAdmin(): void {
    (this.isToken && this.user.role === Role.ADMIN) ? this.isAdmin = true : this.isAdmin = false;
  }

  protected logout() {
    this.configService.clearToken();
    this.router.navigate(['']);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
