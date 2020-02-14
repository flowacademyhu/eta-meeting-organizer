import { Observable } from 'rxjs';
import { User } from '~/app/models/user.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class UserApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiRoute}/users`);
  }

  public getOneUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiRoute}/users/` + id);
  }

  public deleteUserById(id: number) {
    return this.http.delete(`${this.apiRoute}/users/` + id);
  }
}
