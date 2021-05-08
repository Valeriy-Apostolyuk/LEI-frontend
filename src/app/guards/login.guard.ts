import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(): Observable<boolean> {
        return this._authService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    this._router.navigate(['/']);
                    return false;
                }
                return true;
            })
        );
    }
}