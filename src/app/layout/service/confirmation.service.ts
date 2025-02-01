import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private confirmationSubject = new Subject<boolean>();

  constructor(private confirmationService: ConfirmationService) {}

  confirm(message: string): Observable<boolean> {
    this.confirmationService.confirm({
      message,
      header: 'Confirm Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmationSubject.next(true);
      },
      reject: () => {
        this.confirmationSubject.next(false);
      }
    });

    return this.confirmationSubject.asObservable();
  }
}
