import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserRequest, DeleteUserRequest, UpdateUserRequest, UserResponse } from '../api/user';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl + '/User';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}?Id=${id}`)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getMe(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/me`)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getAll(query?: string): Observable<UserResponse[]> {
    const url = query ? `${this.baseUrl}/all?query=${query}` : `${this.baseUrl}/all`;
    return this.http.get<UserResponse[]>(url)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  create(request: CreateUserRequest): Observable<any> {
    const formData = new FormData();
    formData.append('FirstnameEn', request.firstnameEn);
    formData.append('FirstnameRu', request.firstnameRu);
    formData.append('LastnameEn', request.lastnameEn);
    formData.append('LastnameRu', request.lastnameRu);
    formData.append('Gender', request?.gender?.toString());
    formData.append('Userrole', request?.userrole?.toString());
    if (request.phone1) formData.append('Phone1', request.phone1);
    if (request.phone2) formData.append('Phone2', request.phone2);
    formData.append('Email', request.email);
    formData.append('Password', request.password);
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.post(`${this.baseUrl}`, formData)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  update(request: UpdateUserRequest): Observable<any> {
    const formData = new FormData();
    formData.append('Id', request.id);
    if (request.firstnameEn) formData.append('FirstnameEn', request.firstnameEn);
    if (request.firstnameRu) formData.append('FirstnameRu', request.firstnameRu);
    if (request.lastnameEn) formData.append('LastnameEn', request.lastnameEn);
    if (request.lastnameRu) formData.append('LastnameRu', request.lastnameRu);
    if (request.gender) formData.append('Gender', request.gender.toString());
    if (request.userrole) formData.append('Userrole', request.userrole.toString());
    if (request.phone1) formData.append('Phone1', request.phone1);
    if (request.phone2) formData.append('Phone2', request.phone2);
    if (request.email) formData.append('Email', request.email);
    if (request.password) formData.append('Password', request.password);
    if (request.confirmPassword) formData.append('ConfirmPassword', request.confirmPassword);
    if (request.oldPassword) formData.append('OldPassword', request.oldPassword);
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.put(`${this.baseUrl}`, formData)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  delete(request: DeleteUserRequest): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, { body: request })
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }
}