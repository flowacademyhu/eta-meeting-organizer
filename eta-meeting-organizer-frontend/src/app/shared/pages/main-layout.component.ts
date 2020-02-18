import { Component } from '@angular/core';
import {ConfigurationService} from '~/app/shared/services/configuration.service';

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

export class MainLayoutComponent {
  constructor(private readonly configService: ConfigurationService) {
    }
  protected checkToken() {
    return !!this.configService.fetchToken('accessToken');
  }
}
