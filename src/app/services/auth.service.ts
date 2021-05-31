import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    userDataChange: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    constructor(
        private _http: HttpClient,
        private readonly _router: Router,
    ) { }

    setSession(access_token: any): void {
        localStorage.setItem('access_token', access_token);
    }

    setUser(user: any): void {
        this.userDataChange.next(new User(user));
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    get user(): User | null {
        return this.userDataChange.value;
    }

    authenticate() {
        return of(new Object({'data': {name: 'Valeriy Apostolyuk', email: 'email@email.com'} }));
        return this._http.get(`${environment.API_URL}me`);
    }

    sendPasswordReset(data: any): Observable<any> {
        return this._http.post(`${environment.API_URL}auth/password-request`, data);
    }

    validateResetToken(token: string): Observable<any> {
        return this._http.get(`${environment.API_URL}auth/reset/validate/${token}`);
    }

    resetPassword(data: any): Observable<any> {
        return this._http.post(`${environment.API_URL}auth/reset`, data);
    }

    login(credentials: any): Observable<any> {
        return of(new Object({ 'status': true, 'access_token': 'aaaaa', 'data': {name: 'Valeriy Apostolyuk', email: 'email@email.com'} }));
        return this._http.post(`${environment.API_URL}auth/login`, credentials);
    }

    refresh(): Observable<any> {
        return this._http.post(`${environment.API_URL}auth/refresh`, null);
    }

    logout(): void {
        this._http.post(`${environment.API_URL}auth/logout`, null).subscribe({
            next: () => this.callback(),
            error: () => this.callback(),
        });
    }

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

    private callback(): void {
        this.clearSessionStorage();
        this._router.navigate(['/auth']);
    }

    clearSessionStorage(): void {
        try {
            this.userDataChange.next(null);
            this.loggedIn.next(false);
            localStorage.removeItem('access_token');
        } catch (e) {
            console.log('CLEAR SESSION CATCH: ', e);
        }
    }
}
