import { HttpClient } from '@angular/common/http';

export abstract class AbstractApiConnector {

  protected abstract readonly apiRoute: string;

  public constructor(protected http: HttpClient, protected apiBaseUrl: string) {
    if (!http) {
      throw new Error('Http client required.');
    }

    if (!apiBaseUrl) {
      throw new Error('BaseUrl required.');
    }
  }

}
