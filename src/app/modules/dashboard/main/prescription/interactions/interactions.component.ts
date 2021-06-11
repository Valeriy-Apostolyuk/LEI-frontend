import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-interactions',
    templateUrl: './interactions.component.html',
    styleUrls: ['./interactions.component.scss']
})
export class InteractionsComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<InteractionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
    }

}
