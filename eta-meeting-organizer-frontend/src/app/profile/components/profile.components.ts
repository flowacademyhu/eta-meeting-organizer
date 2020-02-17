import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '~/app/models/user.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-profile',
  styles: [`
    .card {
      border-radius: 5%;
    }
    .row {
      min-height: calc(100vh - 60px);
    }
  `],
  template: `
  <div class="row justify-content-center align-items-center">
    <div class="col-4">
    <mat-card class="card">
      <h2>{{'profile.username' | translate}}:  {{(user$ | async)?.name}} </h2>
      <h2>{{'profile.email' | translate}}:  {{(user$ | async)?.email}}</h2>
      <h2>{{'profile.role' | translate}}:  {{(user$ | async)?.role}}</h2>
      <h2>{{'profile.lastName' | translate}}:</h2>
      <h2>{{'profile.firstName' | translate}}:</h2>
      <button mat-raised-button color="primary">{{'profile.delete' | translate}}</button>
    </mat-card>
    </div>
 </div>
  `
})

export class ProfileComponent {
  public id: number = 3;

  public user$: Observable<User>;

  constructor(private readonly api: ApiCommunicationService) {
    this.user$ = this.api.user()
    .getOneUserById(this.id);
   }

}
