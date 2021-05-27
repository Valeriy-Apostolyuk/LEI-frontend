import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private readonly _router: Router
    ) { }

    ngOnInit(): void {
    }

    goToLogin(): void {
        this._router.navigate(['']);
    }

}
