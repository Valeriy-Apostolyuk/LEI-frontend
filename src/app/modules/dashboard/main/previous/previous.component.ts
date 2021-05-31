import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-previous',
    templateUrl: './previous.component.html',
    styleUrls: ['./previous.component.scss']
})
export class PreviousComponent implements OnInit {

    @Input() previous_prescriptions?: any;

    constructor() {
    }

    ngOnInit(): void {
    }
}
