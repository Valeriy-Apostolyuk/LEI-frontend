import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert-service.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-view-more',
    templateUrl: './view-more.component.html',
    styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent extends BaseComponent implements OnInit {

    prescriptions: any = [];
    loading = true

    constructor(
        public dialogRef: MatDialogRef<ViewMoreComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly prescriptionService: PrescriptionService,
        private readonly alertService: AlertService,
    ) {
        super();
        this.subscriptions.add(
            this.prescriptionService.getPrescriptions(data.patient.id).subscribe((res) => {
                if (res.data) {
                    this.prescriptions = res.data;
                    this.loading = false;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

}
