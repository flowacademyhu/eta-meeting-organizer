import { Component } from '@angular/core';
import { environment } from '~/environment/environment';

@Component({
  selector: 'app-login',
  styles: [
    `
      #row {
        padding-top: 20%;
      }
      #customBtn {
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
        width: 30px;
        height: 35px;
        padding-bottom: 5px;
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
        width: 150px;
        height: 100px;
      }
      #googleicon{
        padding-right: 10px;
      }
      a {
        color: white;
        text-decoration: none;
      }
    `,
  ],
  template: `
    <div id="row" class="row align-items-center justify-content-center">
      <div class="col-sm-4">
        <mat-card id="login" style="text-align: center;">
            <img id="image" src="../../../assets/wysio_arrow.png"/>
          <mat-card-content>
          <a href="${environment.googleAuthLink}">
            <button mat-stroked-button id="customBtn" class="customGPlusSignIn">
              <span class="icon">
                <img src="../../../assets/googlelogo.png" />
              </span>
              <span class="buttonText">{{
                "login.loginButton" | translate
              }}</span>
            </button>
          </a>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  // tslint:disable-next-line: no-empty
  constructor() {}
}
