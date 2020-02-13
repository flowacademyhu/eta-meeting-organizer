import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthServiceConfig, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { SharedModule } from '~/app/shared/shared.module';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login-routing.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('160652702041-14ipa76q95t63j3o974o3focpjsr51i7.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: [
    AuthService,
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
  ]
})
export class LoginModule { }
