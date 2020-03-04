import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserToken } from '~/app/shared/models/user-token.model';
import { AuthService } from '~/app/shared/services/auth.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { environment } from '~/environment/environment';

@Component({
  selector: 'app-login',
  styles: [
    `
      #row {
        position: fixed;
        top: 50%;
        padding-left: 72%;
        transform: translate(-50%, -50%);
      }
      #customBtn {
        vertical-align: middle;
        display: inline-block;
        background: rgb(59,59,59);
        color: rgb(243, 245, 237);
        width: 190px;
        border-radius: 5px;
        white-space: 10px;
        padding-left: 10px;
      }
      img {
        background: transparent 5px 50% no-repeat;
        display: inline-block;
        vertical-align: middle;
        width: 31px;
        height: 31px;
      }
      span.buttonText {
        color: white;
        display: inline-block;
        vertical-align: middle;
        padding-left: 15px;
        padding-right: 42px;
        font-size: 14px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
      }
      mat-card {
        justify-content: center;
        background-color: rgb(51, 51, 51);
      }
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
        padding-top: 20px;
      }
      #image {
        background: transparent 5px 50% no-repeat;
        display: inline-block;
        vertical-align: middle;
        width: 200px;
        height: 160px;
        padding-bottom: 5%;
        padding-top: 5%;
      }
      #googleicon{
        padding-top: 5px;
        padding-right: 10px;
        vertical-align: middle;
      }
      #login {
        min-height: 280px;
        min-width: 420px;
        margin: 4px
      }
    `,
  ],
  template: `
    <div id="row" class="container align-items-center justify-content-center">
      <div class="col-sm-4">
        <mat-card id="login" style="text-align: center;">
            <img id="image" src="../../../assets/wysio_arrow.png"/>
          <mat-card-content>
          <a href="${environment.googleAuthLink}">
            <div id="customBtn">
              <span class="googleicon">
                <img src="../../../assets/googlelogo.png" />
              </span>
              <span class="buttonText">{{
                "login.loginButton" | translate
              }}</span>
            </div>
          </a>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  protected isToken: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected user: UserToken = {} as UserToken;

  constructor(private  readonly router: Router,
              private readonly authService: AuthService,
              private readonly configService: ConfigurationService) {
                this.authService.user.pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                  this.user = data;
                });
                this.checkToken();
                if (this.isToken && !!this.user) {
                  this.router.navigate(['./calendar']);
                }
              }

  protected checkToken(): void {
    if (!!this.configService.fetchToken('accessToken') && !!this.user) {
        this.isToken = true;
    }
  }
}
