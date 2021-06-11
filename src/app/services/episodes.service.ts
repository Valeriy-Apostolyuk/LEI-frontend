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

    getEpisodes(filter = ''): Observable<any> {
        return this._http.get(`${environment.API_URL}episodes/get/${filter}`);
    }

    getDetails(episode: string): Observable<any> {
        return this._http.get(`${environment.API_URL}episodes/${episode}`);
    }
}
