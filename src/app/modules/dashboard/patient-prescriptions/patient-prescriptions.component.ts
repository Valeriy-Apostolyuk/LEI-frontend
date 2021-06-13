import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-patient-prescriptions',
    templateUrl: './patient-prescriptions.component.html',
    styleUrls: ['./patient-prescriptions.component.scss']
})
export class PatientPrescriptionsComponent extends BaseComponent implements OnInit {

    @Input() patient_id: any;
    prescriptions: any = [];
    loading = true

    constructor(
        private readonly prescriptionService: PrescriptionService,
        private readonly alertService: AlertService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.prescriptionService.getPrescriptions(this.patient_id).subscribe((res) => {
                if (res.data) {
                    this.prescriptions = res.data;
                    this.loading = false;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

}
