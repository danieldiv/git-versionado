import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayLoad: any;

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.log(response);
      });
  }

  private armazenarToken(token: string) {
    console.log('armazenando');

    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);

    console.log('pay: ', this.jwtPayLoad);
  }

  private carregarToken() {
    console.log('carregando');

    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
