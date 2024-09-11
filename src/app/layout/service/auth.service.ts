import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetEmailConfirmationCodeResponse, ResetPasswordCommand, ResetPasswordResponse, SignInCommand, SignInResponse } from '../api/auth';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get Email Confirmation Code
  getEmailConfirmationCode(email: string): Observable<GetEmailConfirmationCodeResponse> {
    const params = new HttpParams().set('Email', email);
    return this.http.get<GetEmailConfirmationCodeResponse>(
      `${this.apiUrl}/api/Auth/get-email-confirmation-code`, 
      { params }
    );
  }

  // Sign In
  signIn(command: SignInCommand): Observable<SignInResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignInResponse>(
      `${this.apiUrl}/api/Auth/sign-in`, 
      command, 
      { headers }
    );
  }

  // Reset Password
  resetPassword(command: ResetPasswordCommand): Observable<ResetPasswordResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}/api/Auth/reset-password`, 
      command, 
      { headers }
    );
  }
}
