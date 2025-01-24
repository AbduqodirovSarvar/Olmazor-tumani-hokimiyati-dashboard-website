// services/about.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { CreateAboutCommand, CreateAboutResponse, GetAboutRequest, GetAboutResponse, GetAllAboutResponse, UpdateAboutCommand, UpdateAboutResponse } from '../api/about';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment.prod';
import { DeleteAboutCommand } from '../api/about';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private baseUrl = environment.baseUrl + '/About';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) { }

  // GET /api/About?Id={uuid}
  getAboutById(id: string): Observable<GetAboutResponse> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<GetAboutResponse>(`${this.baseUrl}`, { params })
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  // POST /api/About
  createAbout(data: CreateAboutCommand): Observable<CreateAboutResponse> {
    return this.http.post<CreateAboutResponse>(`${this.baseUrl}`, data)
    .pipe(
      tap(() => this.notificationService.showSuccess("Successfully created a new about!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // PUT /api/About
  updateAbout(data: UpdateAboutCommand): Observable<UpdateAboutResponse> {
    return this.http.put<UpdateAboutResponse>(`${this.baseUrl}`, data)
    .pipe(
      tap(() => this.notificationService.showInfo("Successfully updated about!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // DELETE /api/About
  deleteAbout(id: string): Observable<any> {
    const data: DeleteAboutCommand = {
      id: id
    }
    return this.http.delete(`${this.baseUrl}`, { body: data })
    .pipe(
      tap(() => this.notificationService.showWarn("Successfully deleted about!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // GET /api/About/all
  getAllAbout(query?: string): Observable<GetAboutResponse[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    return this.http.get<GetAboutResponse[]>(`${this.baseUrl}/all`, { params })
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }
}
