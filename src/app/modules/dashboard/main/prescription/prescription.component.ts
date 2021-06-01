import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base/base.component';

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
    })
    constructor() {
        super();
    }

    ngOnInit(): void {
        if (this.prescription) {
            this.prescriptionForm.patchValue(this.prescription);
            this.prescriptionForm.disable();
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
            this.prescriptionForm.reset();
            return value;
        }

        return null;
    }
}
