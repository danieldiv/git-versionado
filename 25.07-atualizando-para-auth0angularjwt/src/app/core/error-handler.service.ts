import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { NotAuthenticadedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) {}

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticadedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Você não permissão para executar esta ação';
      }

      try {
        errors = errorResponse;
        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
