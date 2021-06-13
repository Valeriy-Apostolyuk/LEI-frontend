import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService {

    constructor(
        private _http: HttpClient,
    ) { }

    search(drug: any): Observable<any> {
        return this._http.get(`${environment.API_URL}drugs/${drug}/search`);
    }

    getInteractions(drugs: any): Observable<any> {
        return this._http.post(`${environment.API_URL}drugs/interactions`, drugs);
    }

    getPrescriptions(patient_id: String): Observable<any> {
        return this._http.get(`${environment.API_URL}prescriptions/patient/${patient_id}`);
    }

    addPrescription(data: any): Observable<any> {
        return this._http.post(`${environment.API_URL}prescriptions/store`, data);
    }

}
