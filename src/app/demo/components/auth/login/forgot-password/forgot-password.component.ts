import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layout/service/auth.service';
import { HelperService } from 'src/app/layout/service/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private helperService: HelperService,
        private router: Router
    ) {}

    ngOnInit() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get email() {
        return this.forgotPasswordForm.get('email');
    }

    sendConfirmationCode() {
      this.router.navigate(['auth/login/reset-password']);
        // if (this.forgotPasswordForm.valid) {
        //     const email = this.email?.value;
        //     console.log(email);
        //     this.authService.getEmailConfirmationCode(email).subscribe({
        //         next: (data: any) => {
        //             this.router.navigate(['auth/login/reset-password']);
        //         },
        //         error: (error: Error) => {
        //             console.log(error);
        //         }
        //     });
        // }
    }
}