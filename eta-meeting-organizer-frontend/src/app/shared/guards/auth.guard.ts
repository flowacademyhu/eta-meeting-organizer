import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthGuard implements CanActivate {

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
    return !!this.authService.user.value;
  }

}
