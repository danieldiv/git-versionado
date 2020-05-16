import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Usuario } from '../core/model';

// export class usuarioFiltro {
//   nome: string;
//   pagina = 0;
//   itensPorPagina = 0;
// }

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  // pesquisar(filtro: usuarioFiltro): Promise<any> {
  //   return this.http.get<any>(`${this.usuariosUrl}`)
  //     .toPromise()
  //     .then(response => {
  //       const usuarios = response.content;

  //       const resultado = {
  //         usuarios,
  //         total: response.totalElements
  //       };
  //       return resultado;
  //     });
  // }

  listarTodos(): Promise<any> {
    return this.http.get<any>(`${this.usuariosUrl}`)
      .toPromise();
  }

  buscarPeloCodigo(codigo: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
