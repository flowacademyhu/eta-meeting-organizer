import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router, private readonly config: ConfigurationService) { }

  public canActivate(): boolean | UrlTree {
    if (!this.config.fetchToken('accessToken')) {
      return this.router.createUrlTree(['login']);
    }
    return true;
  }

}
