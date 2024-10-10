import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { catchError, Observable } from 'rxjs';
import { EmployeeCreateRequest, EmployeeDeleteRequest, EmployeeResponse, EmployeeUpdateRequest } from '../api/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.baseUrl + '/Employee';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getById(id: string): Observable<EmployeeResponse> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<EmployeeResponse>(`${this.baseUrl}`, { params })
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getAll(type?: string | null): Observable<EmployeeResponse[]> {
    const url = type ? `${this.baseUrl}/all?Type=${type ?? null}` : `${this.baseUrl}/all`;
    return this.http.get<EmployeeResponse[]>(url)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  create(data: EmployeeCreateRequest): Observable<EmployeeResponse> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      console.log(key, " : ", data[key]);
      formData.append(key, data[key]);
    });

    return this.http.post<EmployeeResponse>(`${this.baseUrl}`, formData)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  update(data: EmployeeUpdateRequest) : Observable<EmployeeResponse> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      console.log(key, " : ", data[key]);
      formData.append(key, data[key]);
    });

    return this.http.put<EmployeeResponse>(`${this.baseUrl}`, formData)
     .pipe(
        catchError(error => this.errorService.handleError(error))
    );
  }

  delete(data: EmployeeDeleteRequest) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}`, { body: data})
     .pipe(
        catchError(error => this.errorService.handleError(error))
    );
  }
}
