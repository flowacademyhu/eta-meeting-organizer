import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { SharedModule } from '~/app/shared/shared.module';
import { environment } from '~/environment/environment';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login-routing.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleKey)
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
