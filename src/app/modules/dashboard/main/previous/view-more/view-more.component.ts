import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-view-more',
    templateUrl: './view-more.component.html',
    styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ViewMoreComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

}
