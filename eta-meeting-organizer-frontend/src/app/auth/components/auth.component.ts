import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  styles: [
    `
    #row {
      min-height: calc(100vh - 60px);
    }
    `,
  ],
  template: `
    <div id="row" class="row align-items-center justify-content-center">
      <p>{{message}}</p>
    </div>
  `
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public message: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly router: Router) {
    this.subscription = this.route.queryParams.subscribe((params) => {
      const token = params['token'] as string;
      if (token) {
        const response = this.authService.decodeAndSaveUser(token);
        if (response === 'Authentication is successfull!' ) {
          this.router.navigate(['./welcome']);
        }
        this.message = response;
      }
    });
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
