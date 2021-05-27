import { Component, OnDestroy, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: []
})
export class BaseComponent implements OnDestroy {

    protected subscriptions: Subscription = new Subscription();

    constructor() {
    }

    prepareRoute(outlet: RouterOutlet): string | undefined | null {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
