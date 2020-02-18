import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-layout',
  styles: [
    ` .mat-list-base .mat-list-item {
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
        <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent { }
