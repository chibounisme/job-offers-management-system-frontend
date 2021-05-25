import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        const token = localStorage.getItem('id_token');
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
        }
        });
        return next.handle(request);
    }
}