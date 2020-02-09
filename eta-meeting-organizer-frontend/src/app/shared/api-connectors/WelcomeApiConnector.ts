import { Observable } from 'rxjs';
import { User } from '~/app/models/placeholder-user.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class WelcomeApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public testGet(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiRoute}/users`);
  }
}
