import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '~/app/models/user.model';
import { ApiCommunicationService } from './api-communication.service';

@Injectable()
export class UserService {
  private _userSub: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private readonly userCom: ApiCommunicationService) { }

  public get userSub() {
    return this._userSub;
  }

  public getUser(id: string) {
    return this.userCom
    .user()
    .getOneUserById(id);
  }

  public getUsers(): Observable<User[]> {
    return this.userCom
    .user()
    .getUsers();
  }

  public getAllUsers() {
     this.userCom.user()
    .getUsers()
    .subscribe((users: User[]) => {
      this._userSub.next(users);
    });
  }

  public deleteUser(id: string) {
    return this.userCom
    .user()
    .deleteUserById(id);
  }

  public updateUser(id: string) {
    return this.userCom.user()
    .updateUserById(id);
  }
}
