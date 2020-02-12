import { Component } from "@angular/core";

@Component({
  selector: "app-welcome-layout",
  styles: [
    `
      mat-icon {
        color: #f3f5ed;
      }

      #navbar-toggle {
        background-color: #333333;
      }

      #navbar-toolbar {
        background-color: #e64b3a;
      }

      #navbar-list, #nav-sidebar {
        background-color: #333333;
        width: 250px;
      }

      .mat-list-base .mat-list-item {
        height: 60px;
        color: #f3f5ed;
        font-size: 20px;
      }

      .divider{
        width:5px;
        height:auto;
        display:inline-block;
      }

      a {
        font: 400 32px/44px Roboto,"Helvetica Neue",sans-serif;
      }
    `
  ],
  template: `
    <mat-toolbar color="warn">
      <mat-toolbar-row id="navbar-toolbar">
        <button id="navbar-toggle"
          type="button"
          aria-label="Toggle sidenav"
          mat-raised-button
          (click)="drawer.toggle()"
          color="primary"
        >
        <mat-icon>compare_arrows</mat-icon>
        </button>
        <div class="ml-auto">
        <button mat-raised-button>Váltás angol nyelvre</button>
        <div class="divider"> </div>
        <button mat-raised-button>Kijelentkezés</button>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav id="nav-sidebar" #drawer mode="side" opened role="navigation">
        <mat-nav-list id="navbar-list">
          <a mat-list-item routerLink="/first">Naptár</a>
          <a mat-list-item routerLink="/second">Tárgyaló kezelő</a>
          <a mat-list-item routerLink="/second">Profil</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class MainLayoutComponent {

}
