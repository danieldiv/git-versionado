import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];

  // aoMudarPagina(event: LazyLoadEvent) {
  //   const pagina = event.first / event.rows;
  //   this.pesquisar(pagina);
  // }

}
