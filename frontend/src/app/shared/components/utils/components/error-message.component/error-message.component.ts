import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'app-error-message',
  template: ``,
  providers: [MessageService],
})
export class ErrorMessageComponent implements OnInit {
  constructor(
    private errorMessageService: ErrorMessageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.errorMessageService.errorMessage$.subscribe((message) => {
      this.showErrorMessage(message);
    });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 5000, // Tempo em milissegundos que a mensagem será exibida
      closable: true, // Permite fechar a mensagem
    });
  }
}
