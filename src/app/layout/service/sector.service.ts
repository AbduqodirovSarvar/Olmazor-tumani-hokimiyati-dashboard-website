import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { CreateSectorRequest, DeleteSectorRequest, SectorResponse, UpdateSectorRequest } from '../api/sector';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private baseUrl: string = environment.baseUrl + '/Sector';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {}

  getById(id: string): Observable<SectorResponse> {
    return this.http.get<SectorResponse>(`${this.baseUrl}?Id=${id}`)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Get all Sectors
  getAll(queryParams?: any): Observable<SectorResponse[]> {
    return this.http.get<SectorResponse[]>(`${this.baseUrl}/all`, { params: queryParams })
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Create a new Sector
  create(request: CreateSectorRequest): Observable<SectorResponse> {
    const formData = new FormData();
    formData.append('NameUz', request.nameUz);
    formData.append('NameEn', request.nameEn);
    formData.append('NameRu', request.nameRu);
    formData.append('NameUzRu', request.nameUzRu);
    if (request.nameKaa) formData.append('NameKaa', request.nameKaa);
    formData.append('DescriptionUz', request.descriptionUz);
    formData.append('DescriptionEn', request.descriptionEn);
    formData.append('DescriptionRu', request.descriptionRu);
    formData.append('DescriptionUzRu', request.descriptionUzRu);
    if (request.descriptionKaa) formData.append('DescriptionKaa', request.descriptionKaa);
    formData.append('EmployeeId', request.employeeId);
    formData.append('LocationId', request.locationId);
    if (request.photo) formData.append('Photo', request.photo);

    console.log("REQ:", request);
    console.log(formData);

    return this.http.post<SectorResponse>(this.baseUrl, formData)
    .pipe(
      tap(() => this.notificationService.showSuccess("Successfully created new sector!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Update an existing Sector
  update(request: UpdateSectorRequest): Observable<SectorResponse> {
    const formData = new FormData();
    formData.append('Id', request.id);
    if (request.nameUz) formData.append('NameUz', request.nameUz);
    if (request.nameEn) formData.append('NameEn', request.nameEn);
    if (request.nameRu) formData.append('NameRu', request.nameRu);
    if (request.nameUzRu) formData.append('NameUzRu', request.nameUzRu);
    if (request.nameKaa) formData.append('NameKaa', request.nameKaa);
    if (request.descriptionUz) formData.append('DescriptionUz', request.descriptionUz);
    if (request.descriptionEn) formData.append('DescriptionEn', request.descriptionEn);
    if (request.descriptionRu) formData.append('DescriptionRu', request.descriptionRu);
    if (request.descriptionUzRu) formData.append('DescriptionUzRu', request.descriptionUzRu);
    if (request.descriptionKaa) formData.append('DescriptionKaa', request.descriptionKaa);
    if (request.employeeId) formData.append('EmployeeId', request.employeeId);
    if (request.locationId) formData.append('LocationId', request.locationId);
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.put<SectorResponse>(this.baseUrl, formData)
    .pipe(
      tap(() => this.notificationService.showInfo("Successfully updated sector!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Delete a Sector
  delete(request: DeleteSectorRequest): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, { body: request })
    .pipe(
      tap(() => this.notificationService.showWarn("Successfully deleted sector!")),
      catchError(error => this.errorService.handleError(error))
    );
  }
}
