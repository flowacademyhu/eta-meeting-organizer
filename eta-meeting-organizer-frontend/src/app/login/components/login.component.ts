import { Component } from '@angular/core';
import { environment } from '~/environment/environment';

@Component({
  selector: 'app-login',
  styles: [
    `
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
        margin-top: 20%;
      }
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }
    }
    `,
  ],
  template: `
    <div class="d-flex justify-content-center">
      <mat-card id="login" class="w-50">
        <mat-card-title>{{ "login.title" | translate }}</mat-card-title>
        <br />
        <mat-card-content>
          <a href="${environment.googleAuthLink}">
            <div id="customBtn" class="customGPlusSignIn">
              <span class="icon">
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
  `
})
export class LoginComponent {
  // tslint:disable-next-line: no-empty
  constructor() {}
}
