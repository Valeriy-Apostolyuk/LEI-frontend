import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PrescriptionComponent } from './prescription/prescription.component';
import { DrugsService } from 'src/app/services/drugs.service';

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
        private readonly drugsService: DrugsService,
        private readonly alertService: AlertService,
        private readonly cdr: ChangeDetectorRef,
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
        );
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
            this.cdr.detectChanges();
            this._validateInteractions();
        }
    }

    removePrescription(index: any) {
        this.prescriptions.splice(index, 1);
        this._validateInteractions();
    }

    submit() {
        console.log('submit');
    }

    private _validateInteractions() {
        if (this.prescriptions.length > 1) {
            const data = this.prescriptions.map((pr: any) => { return pr.id });
            this.subscriptions.add(
                this.drugsService.getInteractions(data).subscribe((res) => {
                    if (res.data) {
                        this.prescriptionComponents.forEach((prescription: any) => {
                            const current_id = prescription.prescriptionForm.get('drug').value?.id;
                            if (current_id) {
                                prescription.interactions = res.data.filter((int: any) => int.id === current_id || int.id_other === current_id);
                            } else {
                                prescription.interactions = [];
                            }
                            this.cdr.detectChanges();
                        });
                    } else {
                        this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                    }
                }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
            )
        } else {
            this.prescriptionComponents.first.interactions = [];
        }
    }

    private _filter(value: string) {
        const filterValue = value?.toLowerCase();
        this.filteredOptions = this.episodes?.map(ep => ep + '').filter(episode => episode.toLowerCase().indexOf(filterValue) == 0);
    }
}
