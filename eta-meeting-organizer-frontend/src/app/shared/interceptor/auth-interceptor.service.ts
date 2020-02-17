import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiCommunicationService} from '~/app/shared/services/api-communication.service';
import {ConfigurationService} from '~/app/shared/services/configuration.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService,
              private readonly api: ApiCommunicationService,
              private readonly router: Router) { }

  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const accessToken = this.config.fetchToken('accessToken');
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(req);
  }
}
