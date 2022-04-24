// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpReqInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqHeader: any = req;
    reqHeader = reqHeader.clone({
      headers: reqHeader.headers.set('Content-Type', 'application/json'),
    });
    this.requests.push(reqHeader);

    console.log('No of requests--->' + this.requests.length);

    this.loaderService.isLoading.next(true);
    return Observable.create((observer: any) => {
      const subscription = next.handle(reqHeader).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(reqHeader);
            observer.next(event);
          }
        },
        (err) => {
          alert('error' + err);
          this.removeRequest(reqHeader);
          observer.error(err);
        },
        () => {
          this.removeRequest(reqHeader);
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(reqHeader);
        subscription.unsubscribe();
      };
    });
  }
}
