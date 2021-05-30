import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: User | null;
    @Output() toggleMenu = new EventEmitter();

    constructor(
        private readonly _router: Router,
        public readonly authService: AuthService,
    ) {
        this.user = this.authService.user;
    }

    ngOnInit(): void {
    }

    goTo(url: string): void {
        this._router.navigate([url]);
    }

    logoClicked(): void {
        this.user ? this.toggleMenu.emit() : this.goTo('/');
    }

    logout() {
        this.authService.logout();
    }

}
