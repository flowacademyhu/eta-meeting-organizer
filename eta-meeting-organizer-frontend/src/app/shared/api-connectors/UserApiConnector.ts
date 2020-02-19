import { Observable } from 'rxjs';
import { User } from '~/app/models/user.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class UserApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getUsers() {
   return this.http.get<User[]>(`${this.apiRoute}/users`);
  }

  public getOneUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiRoute}/users/` + id);
  }

  public deleteUserById(id: string) {
    return this.http.delete(`${this.apiRoute}/users/` + id);
  }
}
