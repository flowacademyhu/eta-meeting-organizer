import { Component, OnInit } from '@angular/core';
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

export class ProfileComponent implements OnInit {
  public id: string = '8888150350006150715113077777';

  public user$: Observable<User>;

  constructor(private readonly api: ApiCommunicationService) {

   }

   ngOnInit() {
    this.api.user()
    .getOneUserById(this.id)
    .subscribe(data => {
      console.log(data);
    })
   }

}
