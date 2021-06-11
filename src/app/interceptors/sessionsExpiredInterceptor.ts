import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert-service.service';

@Injectable()
export class SessionsExpiredInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private readonly _alertService: AlertService
    ) { }

    /**
     * Intercept every http request.
     *
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: any) => this.handleError(err, request, next)));
    }

    /**
     * Custom handler for errors.
     *
     * @param err HttpErrorResponse
     * @return Observable<never>
     */
    private handleError(err: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // to intercept authenticated requests
        if (this.authService.loggedIn.value) {
            if (err.status === 401) {
                // Token expired
                if (err.error === 'token_expired' || err.error.error === 'token_expired') {
                    return this.authService.refresh().pipe(
                        mergeMap((data: any) => {
                            this.authService.setSession(data.access_token);
                            const cloneRequest = request.clone({
                                setHeaders: { Authorization: `Bearer ${data.access_token}` },
                            });
                            return next.handle(cloneRequest);
                        })
                    );
                } else {
                    // session expired
                    localStorage.setItem('previousUrl', this.router.url);
                    this.authService.callback();
                    return EMPTY;
                }
            } else if (err.status === 429) {
                this._alertService.openSnackError('Demasiadas tentativas, por favor tente mais tarde');
                return EMPTY;
            }
        }

        return throwError(err);
    }
}
