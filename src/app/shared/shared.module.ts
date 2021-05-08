import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
    declarations: [
        BaseComponent,
    ],
    exports: [
        BaseComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
        };
    }
}
