import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CreateSlideRequest, DeleteSlideRequest, SlideResponse, UpdateSlideRequest } from '../api/slide';
import { catchError, Observable, tap } from 'rxjs';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private baseUrl = environment.baseUrl + '/Slide';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {}

  getById(id: string): Observable<SlideResponse> {
    return this.http.get<SlideResponse>(`${this.baseUrl}?Id=${id}`)
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Get all Slides
  getAll(queryParams?: any): Observable<SlideResponse[]> {
    return this.http.get<SlideResponse[]>(`${this.baseUrl}/all`, { params: queryParams })
    .pipe(
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Create a new Slide
  create(request: CreateSlideRequest): Observable<SlideResponse> {
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
    formData.append('Photo', request.photo);

    return this.http.post<SlideResponse>(this.baseUrl, formData)
    .pipe(
      tap(() => this.notificationService.showSuccess("Successfully created slide!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Update an existing Slide
  update(request: UpdateSlideRequest): Observable<SlideResponse> {
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
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.put<SlideResponse>(this.baseUrl, formData)
    .pipe(
      tap(() => this.notificationService.showInfo("Successfully updated slide!")),
      catchError(error => this.errorService.handleError(error))
    );
  }

  // Delete a Slide
  delete(request: DeleteSlideRequest): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, { body: request })
    .pipe(
      tap(() => this.notificationService.showWarn("Successfully deleted slide!")),
      catchError(error => this.errorService.handleError(error))
    );
  }
}
