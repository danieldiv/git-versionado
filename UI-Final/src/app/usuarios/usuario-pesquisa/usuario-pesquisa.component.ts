import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuario.service';
// import { usuarioFiltro } from "../usuarioFiltro";
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  // totalRegistros = 0;
  // filtro = new usuarioFiltro();
  usuarios = [];
  @ViewChild('tabelaUsuario', {static: true}) grid: Table;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Usuários');
    this.listarTodos();
  }

  listarTodos() {
    this.usuarioService.listarTodos()
      .then(usuarios => this.usuarios = usuarios);
  }

  pesquisar() {
    this.messageService.add({ severity: 'warn', detail: 'Falta implementacao' });
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.codigo)
      .then(() => {
        this.grid.reset();
        this.listarTodos();

        this.messageService.add({ severity: 'success', detail: 'Usuário excluido com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // pesquisar(pagina = 0) {
  //   this.filtro.pagina = pagina;

  //   this.usuarioService.pesquisar(this.filtro)
  //     .then(resultado => {
  //       this.totalRegistros = resultado.total;

  //       this.usuarios = resultado.usuario;
  //     })
  //     .catch(erro => this.errorHandler.handle(erro));
  // }

  // aoMudarPagina(event: LazyLoadEvent) {
  //   console.log('pagina 2');

  //   const pagina = event.first / event.rows;
  //   this.pesquisar(pagina);
  // }



}
