import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { CreatePostRequest, DeletePostRequest, PostResponse, UpdatePostRequest } from '../api/post';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.baseUrl + '/Post';
  
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }


  createPost(data: CreatePostRequest): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('NameUz', data.NameUz);
    formData.append('NameEn', data.NameEn);
    formData.append('NameRu', data.NameRu);
    formData.append('NameUzRu', data.NameUzRu);
    formData.append('NameKaa', data.NameKaa);
    formData.append('DescriptionUz', data.DescriptionUz);
    formData.append('DescriptionEn', data.DescriptionEn);
    formData.append('DescriptionRu', data.DescriptionRu);
    formData.append('DescriptionUzRu', data.DescriptionUzRu);
    formData.append('DescriptionKaa', data.DescriptionKaa);
    formData.append('Category', JSON.stringify(data.Category));
    if (data.Photo) {
      formData.append('Photo', data.Photo);
    }

    return this.http.post<PostResponse>(`${this.baseUrl}`, formData)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  updatePost(data: UpdatePostRequest): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('Id', data.Id);
    formData.append('NameUz', data.NameUz);
    formData.append('NameEn', data.NameEn);
    formData.append('NameRu', data.NameRu);
    formData.append('NameUzRu', data.NameUzRu);
    formData.append('NameKaa', data.NameKaa);
    formData.append('DescriptionUz', data.DescriptionUz);
    formData.append('DescriptionEn', data.DescriptionEn);
    formData.append('DescriptionRu', data.DescriptionRu);
    formData.append('DescriptionUzRu', data.DescriptionUzRu);
    formData.append('DescriptionKaa', data.DescriptionKaa);
    formData.append('Category', JSON.stringify(data.Category));
    if (data.Photo) {
      formData.append('Photo', data.Photo);
    }

    return this.http.put<PostResponse>(`${this.baseUrl}`, formData)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  deletePost(id: string) : Observable<boolean> {
    const data: DeletePostRequest = {
      Id: id
    }

    return this.http.delete<boolean>(`${this.baseUrl}`, { body: data})
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getPostById(id: string) : Observable<PostResponse> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<PostResponse>(`${this.baseUrl}`, { params })
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  getAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.baseUrl}/all`)
     .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }
}
