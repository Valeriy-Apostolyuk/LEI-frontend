import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    @Input() patient?: User | null;
    patientForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        age: new FormControl(),
        gender: new FormControl()
    })

    constructor() {
        this.patientForm.disable();
    }

    ngOnInit(): void {
        if (this.patient) this.patientForm.patchValue(this.patient);
    }

}
