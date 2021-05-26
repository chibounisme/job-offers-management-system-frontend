import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        const token = localStorage.getItem('id_token');
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
        return next.handle(request).pipe(
            retry(1),
            catchError(
                (error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if(error.status == 401) {
                        this.authService.logout();
                        this.router.navigateByUrl('/login');
                    }
                    else if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    return throwError(errorMessage);
                }
            )
        );
    }
}