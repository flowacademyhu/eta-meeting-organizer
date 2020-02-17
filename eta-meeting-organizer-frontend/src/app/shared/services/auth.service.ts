import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthResponse } from '../models/auth-response.model';
import { UserToken } from '../models/user-token.model';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {
  private _user: UserToken;
  private tokenResponse: AuthResponse = {} as AuthResponse;

  get user(): UserToken {
    return this.user;
  }

  constructor(private readonly configService: ConfigurationService) {}

  public decodeAndSaveUser(token: string): string {
    this.tokenResponse.accessToken = token;
    this._user = jwt_decode(token);
    if (this._user.verified) {
      this.configService.setToken(this.tokenResponse);
      return 'Authentication is successfull!';
    } else {
      return 'Bad request!';
    }
  }

}
