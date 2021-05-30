import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

    episodeControl = new FormControl('', []);
    episodes: string[] = [];
    filteredOptions: Observable<string[]> | any;

    selectedEpisode: any;


    constructor(
        private readonly episodesService: EpisodesService,
        private readonly alertService: AlertService,
    ) {
        super();
        this.fetchData();
    }

    ngOnInit(): void {
        this.filteredOptions = this.episodeControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

    }

    fetchData() {
        this.subscriptions.add(
            this.episodesService.getEpisodes().subscribe((res) => {
                if (res.data) {
                    this.episodes = res.data;
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            }, (res) => this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez'))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.episodes?.map(ep => ep + '').filter(episode => episode.toLowerCase().indexOf(filterValue) === 0);
    }
}
