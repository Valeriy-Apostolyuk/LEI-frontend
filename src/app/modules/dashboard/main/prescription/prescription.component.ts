import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-prescription',
    templateUrl: './prescription.component.html',
    styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent extends BaseComponent implements OnInit {

    @Input() prescription: any;

    prescriptionForm = new FormGroup({
        drug: new FormControl(null, [Validators.required]),
        dose: new FormControl(null, [Validators.required]),
        quantity: new FormControl(null, [Validators.required]),
    })
    constructor() {
        super();

        if (this.prescription) {
            this.prescriptionForm.patchValue(this.prescription);
            this.prescriptionForm.disable();
        }
    }

    ngOnInit(): void {
    }

}
