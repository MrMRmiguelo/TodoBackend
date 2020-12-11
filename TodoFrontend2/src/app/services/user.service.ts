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
    console.log(!!localStorage.getItem('userToken'));
    
    return !!localStorage.getItem('userToken');
  }
  loggedOut(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('userToken');
  }
}
