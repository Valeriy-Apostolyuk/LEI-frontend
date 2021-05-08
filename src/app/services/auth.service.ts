import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    constructor() { }

    setSession(res: any): void {
        localStorage.setItem('access_token', res.access_token);
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    /**
     * check token
     */
    hasToken(): boolean {
        const token = this.getAccessToken();
        return token !== null && token !== undefined;
    }

    /**
     * Retrieve access token from storage
     */
    getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }
}
