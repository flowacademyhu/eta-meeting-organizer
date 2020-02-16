import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-users-table',
  template: `
  
  `
})

export class UsersTableComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private readonly api: ApiCommunicationService) {
    this.users$ = this.api.user()
    .getUsers();
   }

  ngOnInit() { }
}