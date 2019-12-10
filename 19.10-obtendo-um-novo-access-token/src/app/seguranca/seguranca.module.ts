import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        // tokenGetter: tokenGetter,
        tokenGetter, // o mesmo do de cima
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return '';
    //     }
    //   }
    // }),

    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  exports: [],
  providers: [
    JwtHelperService,
    // {
    //   provide: Aut
    // }
  ]
})
export class SegurancaModule { }
