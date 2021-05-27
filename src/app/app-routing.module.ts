import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    {
        path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        canActivate: [LoginGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
