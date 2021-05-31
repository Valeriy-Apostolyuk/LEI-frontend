import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

    @Input() episode?: any;
    episodeForm = new FormGroup({
        id: new FormControl(),
        cause: new FormControl(),
        diagnosis: new FormControl(),
        notes: new FormControl()
    })

    constructor() {
        this.episodeForm.disable();
    }

    ngOnInit(): void {
        if (this.episode) this.episodeForm.patchValue(this.episode);
    }
}
