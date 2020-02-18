import {Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  styles: [
    `
    .row {
      min-height: calc(100vh - 60px);
    }
    `,
  ],
  template: `
    <div class="row align-items-center justify-content-center">
      <h1 *ngIf="badAuthentication" class="mat-display-2">{{ "authentication.answer" | translate}}</h1>
    </div>
  `
})
export class AuthComponent implements OnDestroy {
  private subscription: Subscription;
  public badAuthentication: boolean = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly router: Router) {
    this.subscription = this.route.queryParams.subscribe((params) => {
      const token = params.token as string;
      if (token) {
        const response = this.authService.decodeAndSaveUser(token);
        if (response === 'Authentication is successfull!' ) {
          this.router.navigate(['./welcome']);
        } else {
        this.badAuthentication = true;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
