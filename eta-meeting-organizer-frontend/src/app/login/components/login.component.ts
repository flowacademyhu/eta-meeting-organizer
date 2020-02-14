import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  AuthService,
  AuthServiceConfig,
  SocialUser,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { environment } from '~/environment/environment';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      environment.googleKey
    )
  }
]);

export function provideConfig() {
  return config;
}

@Component({
  selector: 'app-login',
  styles: [
    `
      #row {
        min-height: calc(100vh - 60px);
      }
      #customBtn {
        display: inline-block;
        background: rgb(51, 51, 51);
        color: rgb(243, 245, 237);
        width: 190px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px grey;
        white-space: nowrap;
      }
      img {
        background: transparent 5px 50% no-repeat;
        display: inline-block;
        vertical-align: middle;
        width: 42px;
        height: 42px;
      }
      span.buttonText {
        display: inline-block;
        vertical-align: middle;
        padding-left: 42px;
        padding-right: 42px;
        font-size: 14px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
      }
      mat-card {
        background-color: rgb(230, 75, 58);
      }
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }
    `,
  ],
  template: `
    <div id="row" class="row align-items-center justify-content-center" color="primary">
      <div class="col-sm-4">
        <mat-card id="login">
          <mat-card-title>{{ "login.title" | translate }}</mat-card-title>
          <br />
          <mat-card-content>
            <div id="customBtn" class="customGPlusSignIn">
              <span class="icon">
                <img src="../../../assets/googlelogo.png" />
              </span>
              <span class="buttonText" (click)="signInWithGoogle()">{{
                "login.loginButton" | translate
              }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: SocialUser;
  private subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigurationService,
    private readonly router: Router
  ) {}

  public ngOnInit() {}

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.subscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.configService.setStringToken(this.user.idToken);
      if (this.user.idToken !== null) {
        this.router.navigate(['./welcome']);
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
