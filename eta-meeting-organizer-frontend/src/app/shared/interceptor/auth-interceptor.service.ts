import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigurationService} from '~/app/shared/services/configuration.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService) { }

  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const accessToken = this.config.fetchToken('accessToken');
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
