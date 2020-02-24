import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserToken } from '../models/user-token.model';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {
  private _user: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>({} as UserToken);

  get user() {
    return this._user;
  }

  constructor(private readonly configService: ConfigurationService) {}

  public decodeAndSaveUser(token: string): string {
    const userToken = jwt_decode(token);
    this._user.next(userToken);
    if (userToken.role !== 'PENDING') {
      this.configService.setToken({accessToken: token});
      return 'Authentication is successfull!';
    } else {
      return 'Bad request!';
    }
  }

}
