import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '~/app/models/placeholder-user.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-welcome-description',
  styles: [
    `
      .row {
        min-height: calc(100vh - 60px);
      }
    `,
  ],
  template: `
    <div class="row">
    </div>
  `
})
export class WelcomeDescriptionComponent {
  public language: string;

  public users$: Observable<User[]>;

  constructor(
    private readonly translate: TranslateService,
    private readonly api: ApiCommunicationService
  ) {
    this.language = this.translate.currentLang;
    this.users$ = this.api.welcome()
    .testGet();
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
}
