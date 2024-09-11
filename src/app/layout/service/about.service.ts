// services/about.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAboutCommand, CreateAboutResponse, DeleteAboutCommand, GetAboutRequest, GetAboutResponse, GetAllAboutResponse, UpdateAboutCommand, UpdateAboutResponse } from '../api/about';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private baseUrl = '/api/About';

  constructor(private http: HttpClient) { }

  // GET /api/About?Id={uuid}
  getAboutById(id: string): Observable<GetAboutResponse> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<GetAboutResponse>(`${this.baseUrl}`, { params });
  }

  // POST /api/About
  createAbout(data: CreateAboutCommand): Observable<CreateAboutResponse> {
    return this.http.post<CreateAboutResponse>(`${this.baseUrl}`, data);
  }

  // PUT /api/About
  updateAbout(data: UpdateAboutCommand): Observable<UpdateAboutResponse> {
    return this.http.put<UpdateAboutResponse>(`${this.baseUrl}`, data);
  }

  // DELETE /api/About
  deleteAbout(data: DeleteAboutCommand): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}`, { body: data });
  }

  // GET /api/About/all
  getAllAbout(query?: string): Observable<GetAboutResponse[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    return this.http.get<GetAboutResponse[]>(`${this.baseUrl}/all`, { params });
  }
}
