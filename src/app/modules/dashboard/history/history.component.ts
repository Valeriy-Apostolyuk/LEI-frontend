import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent extends BaseComponent implements OnInit {

    patientControl = new FormControl('', []);
    patient?: User | null;
    patientList: any[] = [];

    filteredOptions: Observable<string[]> | any;

    constructor(
        private readonly alertService: AlertService,
        private readonly patientService: PatientService,
        private readonly prescriptionService: PrescriptionService,
        private readonly cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.patientControl.valueChanges.pipe(
                startWith(''),
                distinctUntilChanged(),
                debounceTime(150)).subscribe((val) => {
                    if (val.length > 2) {
                        this._filter(val);
                    }
                    this.checkValue();
                })
        );
    }

    fetchData(filter = '', update = false) {
        this.subscriptions.add(
            this.patientService.search(filter).subscribe((res) => {
                if (res.data) {
                    this.patientList = res.data;
                    if (update)
                        this.filteredOptions = this.patientList;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    private _filter(value: string) {
        value = value + '';
        const filterValue = value?.toLowerCase();
        this.filteredOptions = this.patientList?.filter(patient => patient.name.toLowerCase().indexOf(filterValue) == 0);
        if (this.filteredOptions.length < 10) {
            this.fetchData(value, true);
        }
    }

    checkValue() {
        let value = this.patientControl.value;
        this.patient = this.patientList.find(patient => patient == value || patient.name == value)
        if (!this.patient) {
            this._reset();
        }
    }

    displayName(value: any) {
        if (value) {
            return value.name;
        }
    }

    private _reset() {
        this.patient = null;
        this.patientList = [];
    }

    // getDetails(option: any) {
    //     this.subscriptions.add(
    //         this.prescriptionService.getPrescriptions(option).subscribe((res) => {
    //             if (res.data) {
    //                 this.selectedEpisode = res.data.episode;
    //                 this.patient = new User(res.data.episode.patient);
    //                 this.previous_prescriptions = res.data.previous_prescriptions;
    //             } else {
    //                 this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
    //             }
    //         }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
    //     );
    // }
}
