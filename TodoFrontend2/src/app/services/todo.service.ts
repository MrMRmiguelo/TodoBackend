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
  obtenerUnaTarea(id:string):Observable<any>{
    return this.http.get<any>(`${this.endpoint}/${id}`)
  }
  agregarUnaTarea(todo:Todo):Observable<any>{
    return this.http.post<any>(`${this.endpoint}/crear_lista`,todo)
  }
  eliminarUnaTarea(todo:Todo):Observable<any>{
    return this.http.delete<any>(`${this.endpoint}/eliminar_lista/${todo._id}`) 
  }
  actualizarUnaTarea(todo:Todo,id:string):Observable<any>{
    return this.http.put<any>(`${this.endpoint}/editar_lista/${id}`,todo)
  }
  actualizarEstado(todo:Todo):Observable<any>{
    return this.http.put<any>(`${this.endpoint}/actualizar_estado/${todo._id}`,[])
  }

  
}
