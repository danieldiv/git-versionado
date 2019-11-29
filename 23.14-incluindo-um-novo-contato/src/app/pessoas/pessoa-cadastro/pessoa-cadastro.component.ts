import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa, Contato } from 'src/app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exibindoFormularioContato = false;
  contato: Contato;

  constructor(
    private pessoaService: PessoaService,
    private toast: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.title.setTitle('Cadastro de Pessoa');
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
  }

  confirmarContato(frm: FormControl) {
    this.pessoa.contatos.push(this.clonarContato(this.contato));

    this.exibindoFormularioContato = false;

    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // novo(form: FormControl) {
  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  // salvar(form: FormControl) {
  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  // adicionarPessoa(form: FormControl) {
  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toast.success('Pessoa salva com sucesso');

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // atualizarPessoa(form: FormControl) {
  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toast.success('Pessoa alterada com sucesso');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
