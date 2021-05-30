import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EpisodesService {

    constructor(
        private _http: HttpClient,
    ) { }

    getEpisodes(): Observable<any> {
        return of(new Object({ 'data': [1, 2, 3, 4, 5] }));
        return this._http.get(`${environment.API_URL}episodes`);
    }

    getData(episode: string): Observable<any> {
        return this._http.get(`${environment.API_URL}episodes/${episode}`);
    }
}
