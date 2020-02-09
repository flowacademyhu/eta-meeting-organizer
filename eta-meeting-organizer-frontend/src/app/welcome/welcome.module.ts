import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { WelcomeDescriptionComponent } from '~/app/welcome/components/welcome-description.component';
import { WelcomeRoutingModule } from '~/app/welcome/welcome-routing.module';

@NgModule({
  declarations: [
    WelcomeDescriptionComponent,
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class WelcomeModule { }
