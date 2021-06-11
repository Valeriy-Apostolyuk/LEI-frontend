import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(
        private _http: HttpClient,
    ) { }

    search(patient: any): Observable<any> {
        return this._http.get(`${environment.API_URL}patientes/search/${patient}`);
    }
}
