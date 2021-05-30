import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
    constructor(
        private readonly authService: AuthService,
        private readonly _router: Router,
    ) { }

    resolve(): Observable<any> | undefined {
        if (!this.authService.loggedIn.value) {
            return;
        }

        if (this.authService.user == null) {
            return this.authService.authenticate().pipe(
                map(
                    (res: any) => {
                        if (res) {
                            this.authService.setUser(res.data);
                        }
                    },
                    catchError(() => {
                        this._router.navigate(['/auth']);
                        return EMPTY;
                    })
                )
            );
        } else {
            return of({ data: this.authService.user });
        }
    }
}
