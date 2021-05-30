import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

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
        MatMenuModule,
        MatDividerModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
        };
    }
}
