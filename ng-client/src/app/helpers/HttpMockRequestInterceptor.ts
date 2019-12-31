import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as airports from '../../assets/responseMockups/airports.json';
import { environment } from '../../environments/environment';

const { apiUrl }: { apiUrl: string } = environment;
const urls = [
    {
        json: airports,
        url: `${apiUrl}/airports`,
    }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of urls) {
            if (request.url === element.url) {
                console.log('Loaded from json : ' + request.url);
                return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
            }
        }
        console.log('Loaded from http call :' + request.url);
        return next.handle(request);
    }
}
