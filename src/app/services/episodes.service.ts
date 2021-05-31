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

    getDetails(episode: string): Observable<any> {
        return of(new Object({ 'data': {
            episode: {id: episode, cause: 'Acidente trabalho', diagnosis: 'Traumatismo craniano', notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga sint eos at quae. Natus facilis repudiandae nam atque autem ipsam minima aut? Animi, explicabo?'},
            patient: {id: 1, name: 'Miguel Antues', age: 36, gender: 'M'},
            previous_prescriptions: [
                { date: '02-04-2021', drug: 'Paracetamol', dose: '500mg' },
                { date: '02-04-2021', drug: 'Paracetamol', dose: '500mg' },
                { date: '02-04-2021', drug: 'Paracetamol', dose: '500mg' }
            ]
        } }));
        return this._http.get(`${environment.API_URL}episodes/${episode}`);
    }
}
