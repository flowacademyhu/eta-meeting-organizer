import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-layout',
  template: `
    <div class="container">
      <app-header></app-header>
      <div class="content">
        <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
    </div>
  `
})

export class MainLayoutComponent {
}
