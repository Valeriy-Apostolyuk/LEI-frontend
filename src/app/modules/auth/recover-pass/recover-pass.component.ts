import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-recover-pass',
    templateUrl: './recover-pass.component.html',
    styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent extends BaseComponent {

    token: string | null = null;
    invalidToken = false;

    emailForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required])
    });

    resetForm = new FormGroup({
        token: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirm: new FormControl(null, [Validators.required])
    }, this.passwordConfirmation());

    constructor(
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly alertService: AlertService,
        private readonly router: Router,
    ) {
        super();
        this.token = this.route.snapshot.paramMap.get('token');

        if (this.token) {
            this._verifyToken(this.token);
        }
    }

    pressEnter(e: any): void {
        e.preventDefault();
        e.target.blur();
        this.submitForm();
    }

    submitForm() {
        const formGroup = this.token ? this.resetForm : this.emailForm;
        formGroup.markAllAsTouched();
        const controls = formGroup.controls;
        for (const name in controls) {
            controls[name].markAsDirty();
            controls[name].updateValueAndValidity({ emitEvent: false });
        }

        if (formGroup.invalid) {
            return;
        }
        const data = formGroup.value;
        const service = this.token ? this.authService.sendPasswordReset(data) : this.authService.resetPassword(data);

        this.subscriptions.add(
            service.subscribe((res) => {
                if (res.status) {
                    const text = this.token ? 'Palavra-passe atualizada com sucesso' : 'Por favor, siga as intruções enviadas no email';
                    this.alertService.openSnack(text);
                    this.router.navigateByUrl('/auth');
                } else {
                    this.alertService.openSnackError('Ocorreu um erro, por favor tente outra vez');
                }
            },
                (res: HttpErrorResponse) => this.alertService.openSnackError(res.error.message))
        )
    }

    private _verifyToken(token: string): void {
        this.subscriptions.add(
            this.authService.validateResetToken(token).subscribe((res: any) => {
                if (res.status) {
                    this.resetForm.controls.token.setValue(token);
                } else {
                    this.invalidToken = true;
                }
            }, () => { this.invalidToken = true; })
        );
    }

    private passwordConfirmation(): ValidatorFn {
        return (currentControl: AbstractControl): { [key: string]: any } => {
            const password = currentControl.get('password')?.value;
            const confirmPassword = currentControl.get('passwordConfirm')?.value;

            if (!password || !confirmPassword) {
                return { passwordConfirmation: false };
            }
            if (password !== confirmPassword) {
                return { passwordConfirmation: true };
            }
            return {};
        }
    }
}
