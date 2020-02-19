import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';
import { UserToken } from '../models/user-token.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private subs: Subscription;
  private userToken: UserToken;

  constructor(private readonly router: Router,
              private readonly config: ConfigurationService,
              private readonly authService: AuthService) { }

  public canActivate(): boolean | UrlTree {
    const token = this.config.fetchToken('accessToken');
    if (!token) {
      return this.router.createUrlTree(['login']);
    } else if (!this.isUserRepresent()) {
      this.authService.decodeAndSaveUser(token);
      return (this.isUserRepresent()) ? true : this.router.createUrlTree(['login']);
    }
    return true;
  }

  public isUserRepresent(): boolean {
    this.subs = this.authService.user.subscribe((data) => {
      this.userToken = data;
    });
    this.subs.unsubscribe();
    return !!this.userToken;
  }

}
