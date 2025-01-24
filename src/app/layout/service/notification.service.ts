import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {}

    showSuccess(text: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
    }

    showInfo(text: string) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: text });
    }

    showWarn(text: string) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: text });
    }

    showError(text: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
    }

    showContrast(text: string) {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: text });
    }

    showSecondary(text: string) {
        this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: text });
    }
}
