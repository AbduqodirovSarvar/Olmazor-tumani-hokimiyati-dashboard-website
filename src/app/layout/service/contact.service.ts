import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { ContactResponse, CreateContactCommand, DeleteContactCommand, UpdateContactCommand } from '../api/contact';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = environment.baseUrl + '/Contact';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  create(data: CreateContactCommand) : Observable<ContactResponse>{
    return this.http.post<ContactResponse>(`${this.baseUrl}`, data)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  update(data: UpdateContactCommand) : Observable<ContactResponse>{
    return this.http.put<ContactResponse>(`${this.baseUrl}`, data)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  delete(data: DeleteContactCommand) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}`, { body: data})
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  get(id: string) : Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.baseUrl}/${id}`)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getAll() : Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(`${this.baseUrl}/all`)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }
}
