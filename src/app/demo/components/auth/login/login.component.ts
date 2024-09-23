import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/layout/service/auth.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { SignInCommand, SignInResponse } from 'src/app/layout/api/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private helperService: HelperService
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    login() {
        if (this.loginForm.valid) {
            const command: SignInCommand = {
                email: this.email?.value,
                password: this.password?.value
            };
            console.log(command);
            this.authService.signIn(command).subscribe({
                next: (data: SignInResponse) => {
                    this.helperService.setAccessToken(data.accessToken);
                    this.helperService.redirectToDashboard();
                },
                error: (error: Error) => {
                    console.log(error);
                }
            });
        }
    }
}
