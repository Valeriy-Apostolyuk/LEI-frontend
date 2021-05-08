import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [LoginGuard],
        children: [
            { path: '', component: LoginComponent },
            { path: 'password/reset', component: RecoverPassComponent },
            { path: 'password/reset/:token', component: RecoverPassComponent },
        ],
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
