import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert-service.service';
import { DrugsService } from 'src/app/services/drugs.service';

@Component({
    selector: 'app-prescription',
    templateUrl: './prescription.component.html',
    styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent extends BaseComponent implements OnInit {

    @Input() prescription: any;
    @Output() addPrescriptionEmitter = new EventEmitter();
    @Output() removePrescription = new EventEmitter();

    prescriptionForm = new FormGroup({
        drug: new FormControl(null, [Validators.required]),
        dose: new FormControl(null, [Validators.required]),
        quantity: new FormControl(null, [Validators.required]),
    });

    filteredOptions: any;
    interactions: any;

    constructor(
        private readonly drugsService: DrugsService,
        private readonly alertService: AlertService,
    ) {
        super();
        this._reset();
    }

    ngOnInit(): void {
        if (this.prescription) {
            this.prescriptionForm.patchValue(this.prescription);
            this.prescriptionForm.disable();
        } else {
            this.subscriptions.add(
                this.prescriptionForm.get('drug')?.valueChanges.pipe(
                    distinctUntilChanged(),
                    debounceTime(150)).subscribe((val) => {
                        if (typeof val == 'string' && val.length > 2)
                            this._fetchData(val);
                    })
            )
        }
    }

    addPrescription() {
        this.prescriptionForm.markAllAsTouched();
        const controls = this.prescriptionForm.controls;
        for (const name in controls) {
            controls[name].markAsDirty();
            controls[name].updateValueAndValidity({ emitEvent: false });
        }

        if (this.prescriptionForm.valid) {
            const value = this.prescriptionForm.value;
            this._reset();
            return value;
        }

        return null;
    }

    displayName(value: any) {
        if (value) {
            return value.drug;
        }
    }

    private _fetchData(drug: string) {
        this.subscriptions.add(
            this.drugsService.search({ drug }).subscribe((res) => {
                if (res.data) {
                    this.filteredOptions = res.data;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    private _reset() {
        this.prescriptionForm.reset();
        this.filteredOptions = [];
        this.interactions = [];
    }
}
