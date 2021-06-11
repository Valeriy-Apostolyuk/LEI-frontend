import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionService } from 'src/app/services/prescription.service';

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
    hasInteractions = false;

    selectedEpisode: any;
    patient?: User | null;

    @ViewChildren(PrescriptionComponent) prescriptionComponents!: QueryList<PrescriptionComponent>;

    constructor(
        private readonly episodesService: EpisodesService,
        private readonly prescriptionService: PrescriptionService,
        private readonly alertService: AlertService,
        private readonly cdr: ChangeDetectorRef,
    ) {
        super();
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

    fetchData(filter = '', update = false) {
        this.subscriptions.add(
            this.episodesService.getEpisodes(filter).subscribe((res) => {
                if (res.data) {
                    this.episodes = res.data;
                    if (update)
                        this.filteredOptions = this.episodes;
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
                    this.patient = new User(res.data.episode.patient);
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
            this._reset();
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

    checkSubmit() {
        if (this.hasInteractions) {
            this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
            return;
        }
        const check = this.prescriptionComponents.last.checkInputs();
        if (!check) {
            return;
        } else if (typeof (check) == 'object') {
            this.prescriptions.push(check);
            this.cdr.detectChanges();
            this._validateInteractions(true);
        } else {
            this.submit();
        }
    }

    submit() {
        const data = {
            drugs: this.prescriptions,
            patient_id: this.selectedEpisode.patient.id
        };

        this.subscriptions.add(
            this.prescriptionService.addPrescription(data).subscribe((res) => {
                if (res.data) {
                    this._reset();
                    this.episodeControl.setValue('');
                    this.alertService.openSnack('Prescrição adicionada com sucesso');
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        )
    }

    private _reset() {
        this.selectedEpisode = null;
        this.patient = null;
        this.previous_prescriptions = [];
        this.prescriptions = [];
        this.hasInteractions = false;
    }

    private _validateInteractions(submit = false) {
        if (this.prescriptions.length > 1) {
            const data = this.prescriptions.map((pr: any) => { return pr.drug.id });
            this.subscriptions.add(
                this.prescriptionService.getInteractions(data).subscribe((res) => {
                    if (res.data) {
                        this.hasInteractions = res.data.length;
                        if (this.hasInteractions) {
                            this.prescriptionComponents.forEach((prescription: any) => {
                                const current_id = prescription.prescriptionForm.get('drug').value?.id;
                                if (current_id) {
                                    prescription.interactions = res.data.filter((int: any) => int.id_1 === current_id || int.id_2 === current_id);
                                } else {
                                    prescription.interactions = [];
                                }
                                this.cdr.detectChanges();
                            });
                        } else if (submit) {
                            this.submit();
                        }
                    } else {
                        this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                    }
                }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
            )
        } else {
            this.prescriptionComponents.first.interactions = [];
            this.hasInteractions = false;
        }
    }

    private _filter(value: string) {
        value = value + '';
        const filterValue = value?.toLowerCase();
        this.filteredOptions = this.episodes?.map(ep => ep + '').filter(episode => episode.toLowerCase().indexOf(filterValue) == 0);
        if (this.filteredOptions.length < 10) {
            this.fetchData(value, true);
        }
    }
}
