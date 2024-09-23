import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumResponse } from '../api/enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class BaseApiService {
  private baseApiUrl: string = environment.baseUrl;
  private baseFileApiUrl: string = environment.baseFileUrl;

  constructor(private http: HttpClient) { }


  public getAllEnums(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Common/enum/all`);
  }

  public getGenders(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Common/enum/genders`);
  }

  public getUserRoles(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Users`);
  }

  public getEmployeeCategories(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/EmployeeCategories`);
  }

  public getContactTypes(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Common/enum/contact-types`);
  }

  public getPostCategories(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Common/enum/post-categories`);
  }

  public getWeekDays(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(`${this.baseApiUrl}/Common/enum/weekdays`);
  }

  public getPhoto(id: string) : string {
    return `${this.baseFileApiUrl}/${id}`;
  }
}
