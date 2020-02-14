import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SharedModule } from '~/app/shared/shared.module';
import { environment } from '~/environment/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// http loader for translations file
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

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
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // Own modules
    SharedModule,

    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      }
    }),
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
]
})
export class AppModule {
}
