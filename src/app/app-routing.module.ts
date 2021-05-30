import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
    {
        path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        resolve: {
            user: UserResolver,
        },
    },
    {
        path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        canActivate: [LoginGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [UserResolver],
})
export class AppRoutingModule { }
