import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PrescriptionComponent } from './prescription/prescription.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

    episodeControl = new FormControl('', []);
    episodes: string[] = [];
    previous_prescriptions: any[] = [];
    filteredOptions: Observable<string[]> | any;
    prescriptions: any = [];

    selectedEpisode: any;
    patient?: User | null;

    @ViewChildren(PrescriptionComponent) prescriptionComponents!: QueryList<PrescriptionComponent>;

    constructor(
        private readonly episodesService: EpisodesService,
        private readonly alertService: AlertService,
    ) {
        super();
        this.fetchData();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.episodeControl.valueChanges.pipe(
                startWith(''),
                distinctUntilChanged(),
                debounceTime(150)).subscribe((val) => {
                    this._filter(val);
                    this.checkValue();
                })
        )
    }

    fetchData() {
        this.subscriptions.add(
            this.episodesService.getEpisodes().subscribe((res) => {
                if (res.data) {
                    this.episodes = res.data;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    getDetails(option: any) {
        this.subscriptions.add(
            this.episodesService.getDetails(option).subscribe((res) => {
                if (res.data) {
                    this.selectedEpisode = res.data.episode;
                    this.patient = new User(res.data.patient);
                    this.previous_prescriptions = res.data.previous_prescriptions;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    checkValue() {
        let value = this.episodeControl.value;
        if (this.episodes.find(ep => ep == value)) {
            this.getDetails(value);
        } else {
            this.selectedEpisode = null;
            this.patient = null;
            this.previous_prescriptions = [];
        }
    }

    addPrescription() {
        let new_prescription = this.prescriptionComponents.last.addPrescription();
        if (new_prescription) {
            this.prescriptions.push(new_prescription);
        }
    }

    removePrescription(index: any) {
        this.prescriptions.splice(index, 1);
    }

    submit() {
        console.log('submit');
    }

    private _filter(value: string) {
        const filterValue = value?.toLowerCase();
        this.filteredOptions = this.episodes?.map(ep => ep + '').filter(episode => episode.toLowerCase().indexOf(filterValue) == 0);
    }
}
