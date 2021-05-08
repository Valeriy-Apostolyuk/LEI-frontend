import { Component, OnDestroy, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionButtonsService } from '@app/services/action-buttons.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: []
})
export class BaseComponent implements OnDestroy {

    protected subscriptions: Subscription = new Subscription();
    // protected actionButtonsService: ActionButtonsService;

    constructor() {
        // this.actionButtonsService = new ActionButtonsService();
    }

    prepareRoute(outlet: RouterOutlet): string | undefined | null {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    ngOnDestroy(): void {
        // this.actionButtonsService.buttonsData = { visible: false };
        this.subscriptions.unsubscribe();
    }
}
