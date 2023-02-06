import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { setting } from 'src/app/settings/setting';

@Injectable()
export class YoutubeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const youtubeReq = req.clone({
      url: `${req.url}&key=${setting.stringConstants.apiKey}`,
    });

    return next.handle(youtubeReq);
  }
}
