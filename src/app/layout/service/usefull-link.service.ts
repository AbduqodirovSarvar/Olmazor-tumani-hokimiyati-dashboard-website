import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { CreateUsefullLinkRequest, DeleteUsefullLinkRequest, UpdateUsefullLinkRequest, UsefullLinkResponse } from '../api/usefullLink';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UsefullLinkService {
  private baseUrl = environment.baseUrl + '/UsefullLink';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private notificationService: NotificationService,
  ) {}

  getById(id: string): Observable<UsefullLinkResponse> {
    return this.http.get<UsefullLinkResponse>(`${this.baseUrl}?Id=${id}`)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getAll(query?: string): Observable<UsefullLinkResponse[]> {
    const url = query ? `${this.baseUrl}/all?query=${query}` : `${this.baseUrl}/all`;
    return this.http.get<UsefullLinkResponse[]>(url)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  create(request: CreateUsefullLinkRequest): Observable<any> {
    const formData = new FormData();
    if (request.nameUz) formData.append('NameUz', request.nameUz);
    if (request.nameEn) formData.append('NameEn', request.nameEn);
    if (request.nameRu) formData.append('NameRu', request.nameRu);
    if (request.nameUzRu) formData.append('NameUzRu', request.nameUzRu);
    if (request.nameKaa) formData.append('NameKaa', request.nameKaa);
    if (request.link) formData.append('Link', request.link);
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.post(`${this.baseUrl}`, formData)
     .pipe(
        tap(() => this.notificationService.showSuccess("Successfully created new link!")),
        catchError(error => this.errorService.handleError(error))
      );
  }

  update(request: UpdateUsefullLinkRequest): Observable<any> {
    const formData = new FormData();
    if (request.id) formData.append('Id', request.id);
    if (request.nameUz) formData.append('NameUz', request.nameUz);
    if (request.nameEn) formData.append('NameEn', request.nameEn);
    if (request.nameRu) formData.append('NameRu', request.nameRu);
    if (request.nameUzRu) formData.append('NameUzRu', request.nameUzRu);
    if (request.nameKaa) formData.append('NameKaa', request.nameKaa);
    if (request.link) formData.append('Link', request.link);
    if (request.photo) formData.append('Photo', request.photo);

    return this.http.put(`${this.baseUrl}`, formData)
     .pipe(
        tap(() => this.notificationService.showInfo("Successfully updated link!")),
        catchError(error => this.errorService.handleError(error))
      );
  }

  delete(request: DeleteUsefullLinkRequest): Observable<any> {
    return this.http.request('delete', this.baseUrl, {
      body: request
    })
    .pipe(
      tap(() => this.notificationService.showWarn("Successfully deleted link!")),
      catchError(error => this.errorService.handleError(error))
    );
  }
}