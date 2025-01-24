import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public handleError(error: any): Observable<never> {
    if (error.status === 401) {
      // Token is expired or unauthorized
      this.router.navigate(['/auth/login']);
    }
    this.notificationService.showError(error.error.toString());
    return throwError(() => {
      new Error(error.message);
    });
  }
}