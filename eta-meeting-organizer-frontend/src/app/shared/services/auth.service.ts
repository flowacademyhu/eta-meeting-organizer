import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserToken } from '../models/user-token.model';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {
  private _user: UserToken;

  get user(): UserToken {
    return this.user;
  }

  constructor(private readonly configService: ConfigurationService) {}

  public decodeAndSaveUser(token: string): string {
    this._user = jwt_decode(token);
    if (this._user.verified) {
      this.configService.setToken({accessToken: token});
      return 'Authentication is successfull!';
    } else {
      return 'Bad request!';
    }
  }

}
