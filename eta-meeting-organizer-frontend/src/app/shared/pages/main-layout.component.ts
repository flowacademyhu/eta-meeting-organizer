import { Component } from "@angular/core";

@Component({
  selector: "app-welcome-layout",
  styles: [
    `
      /* .example-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #eee;
      } */
      mat-icon {
        color: black;
      }
    `
  ],
  template: `
    <mat-toolbar color="warn">
      <mat-toolbar-row>
        <button class="valami"
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
          color="primary"
        >
        <mat-icon>compare_arrows</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav #drawer mode="side" opened role="navigation">
        <mat-nav-list>
          <a mat-list-item routerLink="/first">First Component</a>
          <a mat-list-item routerLink="/second">Second Component</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class MainLayoutComponent {}
