import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '~/app/models/user.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class UserApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public userSub: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  public getUsers() {
    this.http.get<User[]>(`${this.apiRoute}/users`)
    .subscribe((data) => {
      this.userSub.next(data);
    });
  }

  public getOneUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiRoute}/users/` + id);
  }

  public deleteUserById(id: number) {
    return this.http.delete(`${this.apiRoute}/users/` + id);
  }
}
