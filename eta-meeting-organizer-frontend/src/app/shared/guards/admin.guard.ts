import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Role } from '~/app/models/user.model';
import { UserToken } from '../models/user-token.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  private subs: Subscription;
  private userToken: UserToken = {} as UserToken;

  constructor(private readonly authService: AuthService) {}

  public canActivate(): boolean | UrlTree {
    this.subs = this.authService.user.pipe(take(1))
    .subscribe((data) => {
      this.userToken = data;
    });
    this.subs.unsubscribe();
    return this.userToken.role === Role.ADMIN ? true : false;
  }
}
