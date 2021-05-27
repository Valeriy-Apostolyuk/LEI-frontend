import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
    })

    constructor() { }

    ngOnInit(): void {
    }

    pressEnter(e: any): void {
        e.preventDefault();
        e.target.blur();
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
    }

}
