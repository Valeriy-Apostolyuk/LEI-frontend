import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        private readonly snackBar: MatSnackBar
    ) { }

    openSnack(message: string = '', actionName: string | undefined = undefined, callback: any = undefined): void {
        let duration = actionName ? 4000 : 2000;
        const snack = this.snackBar.open(message, actionName, {
            duration: duration,
            panelClass: 'info-snack',
        });

        if (callback) {
            snack.onAction().subscribe(callback);
        }
    }

    openSnackError(message: string = ''): void {
        this.snackBar.open(message, ' ', {
            duration: 2000,
            panelClass: 'error-snack',
        });
    }
}
