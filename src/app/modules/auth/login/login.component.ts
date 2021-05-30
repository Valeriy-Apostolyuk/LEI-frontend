import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
    })

    constructor(
        private readonly authService: AuthService,
        private readonly alertService: AlertService,
        private readonly router: Router
    ) {
        super();
    }

    ngOnInit(): void {
    }

    pressEnter(e: any): void {
        e.preventDefault();
        e.target.blur();
        this.submitForm();
    }

    submitForm() {
        this.loginForm.markAllAsTouched();

        this.loginForm.get('email')?.markAsDirty();
        this.loginForm.get('email')?.updateValueAndValidity({ emitEvent: false });

        this.loginForm.get('password')?.markAsDirty();
        this.loginForm.get('password')?.updateValueAndValidity({ emitEvent: false });

        if (this.loginForm.invalid) {
            return;
        }

        this.subscriptions.add(
            this.authService.login(this.loginForm.value).subscribe((res: any) => {
                if (res.status) {
                    this.authService.setSession(res.access_token);
                    this.authService.loggedIn.next(true);
                    this.authService.setUser(res.data);
                    const previousUrl = localStorage.getItem('previousUrl');

                    if (previousUrl) {
                        this.router.navigate([previousUrl]);
                        localStorage.removeItem('previousUrl');
                    } else {
                        this.router.navigate(['/']);
                    }
                } else {
                    Object.entries(res.errors).forEach((error: any) => {
                        this.alertService.openSnackError(error[1][0]);
                    });
                }
            },
                (res: HttpErrorResponse) => this.alertService.openSnackError(res.error.message)
            )
        );

    }

}
