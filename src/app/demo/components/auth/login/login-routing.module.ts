import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent},
        { path: 'reset-password', component: ResetPasswordComponent}
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
