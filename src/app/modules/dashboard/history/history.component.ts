import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

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
                        this.checkValue();
                    }
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

    // @TODO : Check with id
    // checkValue() {
    //     let value = this.patientControl.value;
    //     if (this.patientList.find(patient => patient.name == value)) {
    //         this.getDetails(value);
    //     } else {
    //         this._reset();
    //     }
    // }
}
