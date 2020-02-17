import { Component } from '@angular/core';
import {ConfigurationService} from '~/app/shared/services/configuration.service';

@Component({
  selector: 'app-welcome-layout',
  styles: [
    `
      #navbar-list, #nav-sidebar {
        width: 250px;
      }

      .mat-list-base .mat-list-item {
        height: 60px;
        font-size: 20px;
      }

      a {
        font: 400 32px/44px Roboto,"Helvetica Neue",sans-serif;
      }
    `,
  ],
  template: `
    <app-header></app-header>
    <mat-toolbar color="accent">
      <mat-toolbar-row color="accent">
        <button color="warn"
          type="button"
          aria-label="Toggle sidenav"
          mat-raised-button
          (click)="drawer.toggle()"
        >
        <mat-icon>compare_arrows</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container color="accent">
      <mat-sidenav id="nav-sidebar" color="accent" #drawer mode="side" opened role="navigation">
        <mat-nav-list *ngIf="checkToken()" id="navbar-list" color="accent">
          <a mat-list-item routerLink="/first">{{'navbar.calendar' | translate}}</a>
          <a mat-list-item routerLink="/second">{{'navbar.meetingRoomEditor' | translate}}</a>
          <a mat-list-item routerLink="/profile">{{'navbar.profile' | translate}}</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content color="accent">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent {
  constructor(private readonly configService: ConfigurationService) {
    }
  protected checkToken() {
    return !!this.configService.fetchToken('accessToken');
  }
}
