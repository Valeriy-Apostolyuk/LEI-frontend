import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        BaseComponent,
        HeaderComponent,
    ],
    exports: [
        BaseComponent,
        HeaderComponent,
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
