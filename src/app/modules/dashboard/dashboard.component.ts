import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

    desktopLayout = true;
    mode: MatDrawerMode = 'side';
    breakpoints: Array<string> = ['(max-width: 991px)'];
    @ViewChild('menu', { static: true }) private menu?: MatSidenav;
    constructor(
        private readonly _breakpointObserver: BreakpointObserver,
    ) {
        super();

        this.subscriptions.add(
            this._breakpointObserver.observe(this.breakpoints).subscribe((result: any) => {
                this.desktopLayout = !result.matches;
                this.mode = this.desktopLayout ? 'push' : 'over';
            })
        );
    }

    ngOnInit(): void {
    }

    toggleMenu() {
        if (!this.desktopLayout) {
            this.menu?.toggle();
        }
    }


}
