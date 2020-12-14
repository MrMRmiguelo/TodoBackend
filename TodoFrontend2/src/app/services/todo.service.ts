import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api/lista';
  }
  obtenerTareas(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/`);
  }

  
}
