import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CreateLocationRequest, DeleteLocationRequest, LocationResponse, UpdateLocationRequest } from '../api/location';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl: string = environment.baseUrl + "/Location";
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) { }

  getLocationById(id: string): Observable<LocationResponse> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  getAllLocations(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${this.apiUrl}/all`)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  createLocation(data: CreateLocationRequest): Observable<LocationResponse> {
    return this.http.post<LocationResponse>(this.apiUrl, data)
    .pipe(
      tap(() => this.notificationService.showSuccess("Successfully created location!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  updateLocation(data: UpdateLocationRequest): Observable<LocationResponse> {
    return this.http.put<LocationResponse>(`${this.apiUrl}`, data)
    .pipe(
      tap(() => this.notificationService.showInfo("Successfully updated location!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  deleteLocation(data: DeleteLocationRequest): Observable<any> {
    return this.http.delete(`${this.apiUrl}`, {body: data})
    .pipe(
      tap(() => this.notificationService.showWarn("Successfully deleted location!")),
      catchError(error => this.errorService.handleError(error))
    );
  }
}
