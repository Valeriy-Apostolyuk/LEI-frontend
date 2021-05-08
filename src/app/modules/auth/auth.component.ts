import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(
        private readonly _router: Router
    ) { }

    ngOnInit(): void {
    }

    goToLogin(): void {
        this._router.navigate(['login']);
    }
}
