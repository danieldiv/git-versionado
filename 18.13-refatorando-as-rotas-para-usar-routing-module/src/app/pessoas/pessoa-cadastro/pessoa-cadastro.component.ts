import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from 'src/app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  ngOnInit() {

  }

  constructor(
    private pessoaService: PessoaService,
    private toast: ToastyService,
    private errorHandler: ErrorHandlerService
  ) {}

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toast.success('Pessoa salva com sucesso');

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
