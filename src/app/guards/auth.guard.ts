import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._authService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    localStorage.setItem('previousUrl', state.url);
                    this._router.navigateByUrl('/auth');
                    return false;
                }

                return true;
            })
        );
    }

}
