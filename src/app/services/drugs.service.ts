import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DrugsService {

    constructor(
        private _http: HttpClient,
    ) { }

    search(drug: object): Observable<any> {
        return of(new Object({ 'data': [
            {id: 'DB00001', drug: 'Paracetamol'},
            {id: 'DB00002', drug: 'Paracetamol'},
            {id: 'DB00003', drug: 'Paracetamol'},
        ] }));
        return this._http.post(`${environment.API_URL}drugs/search`, drug);
    }

    getInteractions(drugs: any): Observable<any> {
        return of(new Object({ 'data': [
            {id: 'DB00001', interaction: 'Very incompatible', id_other: 'DB00002'},
        ] }));
        return this._http.post(`${environment.API_URL}drugs/interactions`, drugs);
    }
}
