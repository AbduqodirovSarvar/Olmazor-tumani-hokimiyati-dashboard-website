import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GetEmailConfirmationCodeResponse, ResetPasswordCommand, ResetPasswordResponse, SignInCommand, SignInResponse } from '../api/auth';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from './notification.service';
import { ErrorService } from './error.service';
import { er } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl + '/Auth';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) { }

  // Get Email Confirmation Code
  getEmailConfirmationCode(email: string): Observable<GetEmailConfirmationCodeResponse> {
    const params = new HttpParams().set('Email', email);
    return this.http.get<GetEmailConfirmationCodeResponse>(
      `${this.apiUrl}/get-email-confirmation-code`, 
      { params }
    ).pipe(
      tap(() => this.notificationService.showSuccess("Email Confirmation Code Sent!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Sign In
  signIn(command: SignInCommand): Observable<SignInResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignInResponse>(
      `${this.apiUrl}/sign-in`, 
      command, 
      { headers }
    ).pipe(
      tap(() => {
        this.notificationService.showSuccess("Successfully signed in!")
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error)})
    );
  }

  // Reset Password
  resetPassword(command: ResetPasswordCommand): Observable<ResetPasswordResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}/reset-password`, 
      command, 
      { headers }
    ).pipe(
      tap(() => this.notificationService.showSuccess("Successfully reset password!")),
      catchError(error => this.errorService.handleError(error))
    );
  }
}
