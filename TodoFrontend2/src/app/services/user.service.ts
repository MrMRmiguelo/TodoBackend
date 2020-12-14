import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string;
  // en un futuro el winsow.location.hostnamne cambiaria para produccio
  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api';
  }
  register(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/usuario/register`, usuario);
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/usuario/login`, usuario);
  }

  loggedUser(): boolean {
    return !!localStorage.getItem('userToken');
  }
  loggedOut(): void {
    console.log('GUAARGUAR');
    
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('userToken');
  }

  resetPasswordEmail(usuario: Usuario): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/usuario/reestablecer`,
      usuario
    );
  }
  verifyToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/usuario/verificar/${token}`);
  }
  resetPassword(usuario: Usuario, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/usuario/reestablecer/${token}`,
      usuario
    );
  }
}
