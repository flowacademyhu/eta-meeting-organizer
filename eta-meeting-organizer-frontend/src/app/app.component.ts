import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  styles: [``],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(private readonly translate: TranslateService,
              private readonly router: Router) {
    this.initTranslations();
    this.setupRouterEvents();
  }

  private initTranslations() {
    // translation service defaults
    this.translate.setDefaultLang('en');
    this.translate.use('hu');
  }

  private setupRouterEvents(): void {
    // scroll to the top of the page when navigation happens
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
