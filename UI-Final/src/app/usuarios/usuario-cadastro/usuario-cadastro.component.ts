import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoUsuario = this.route.snapshot.params.codigo;

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }
  }

  get editando() {
    return Boolean(this.usuario.codigo);
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPeloCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.usuario.senha = '';

        // this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // atualizarTituloEdicao() {
  //   this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  // }

}
