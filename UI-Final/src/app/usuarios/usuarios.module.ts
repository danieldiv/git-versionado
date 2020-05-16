import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';

import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuariosRountingModule } from './usuarios-routing.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';



@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,

    PasswordModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    TableModule,

    UsuariosRountingModule
  ]
})
export class UsuariosModule { }
