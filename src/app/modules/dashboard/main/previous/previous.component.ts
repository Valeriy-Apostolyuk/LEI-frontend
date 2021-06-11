import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { ViewMoreComponent } from './view-more/view-more.component';

@Component({
    selector: 'app-previous',
    templateUrl: './previous.component.html',
    styleUrls: ['./previous.component.scss']
})
export class PreviousComponent implements OnInit {

    @Input() previous_prescriptions?: any = [];
    @Input() patient?: User | null;

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    openDetails(): void {
        const dialogRef = this.dialog.open(ViewMoreComponent, {
            width: '100%',
            maxWidth: '800px',
            data: { patient: this.patient }
        });
    }
}
