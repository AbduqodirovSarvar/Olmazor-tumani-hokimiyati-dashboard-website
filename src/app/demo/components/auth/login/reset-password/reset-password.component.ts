import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordCommand } from 'src/app/layout/api/auth';
import { AuthService } from 'src/app/layout/service/auth.service';
import { HelperService } from 'src/app/layout/service/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private helperService: HelperService
  ) {}

  ngOnInit() {
      this.resetPasswordForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
          confirmationCode: ['']
      }, { 
          validator: this.passwordMatchValidator 
      });
  }

  get email() {
      return this.resetPasswordForm.get('email');
  }

  get password() {
      return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
      return this.resetPasswordForm.get('confirmPassword');
  }

  get confirmationCode() {
      return this.resetPasswordForm.get('confirmationCode');
  }

  passwordMatchValidator(form: FormGroup) {
      return form.get('password')?.value === form.get('confirmPassword')?.value
          ? null : { mismatch: true };
  }

  resetPassword() {
      if (this.resetPasswordForm.valid) {
          const { email, password, confirmationCode } = this.resetPasswordForm.value;
          const command: ResetPasswordCommand = {
              email,
              password,
              confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value!,
              confirmationCode
            };

            this.authService.resetPassword(command).subscribe({
              next: () => {
                  this.helperService.redirectToLoginPage();
              },
              error: (error: Error) => {
                  console.log(error);
              }
          });
      }
  }
}