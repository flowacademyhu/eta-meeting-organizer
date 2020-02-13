import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-layout',
  template: `
    <div class="container">
      <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
    </div>
  `
})

export class MainLayoutComponent {
}
