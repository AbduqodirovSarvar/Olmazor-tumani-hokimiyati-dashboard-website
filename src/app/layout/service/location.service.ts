import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CreateLocationRequest, LocationResponse, UpdateLocationRequest } from '../api/location';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl: string = environment.baseUrl + "/Location";
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
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
      catchError(error => this.errorService.handleError(error))
    );
  }

  updateLocation(data: UpdateLocationRequest): Observable<LocationResponse> {
    return this.http.put<LocationResponse>(`${this.apiUrl}`, data)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  deleteLocation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }
}
