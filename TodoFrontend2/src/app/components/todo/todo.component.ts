import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  listas: Todo[];
  constructor(
    private todoSevice: TodoService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listTasks();
  }
  listTasks() {
    this.todoSevice.obtenerTareas().subscribe(
      (res) => {
        this.listas = res;
        console.log(this.listas);

        // this.router.navigate(['/']);
      },
      (err) => {
        this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }
  cambiarEstado(id: string) {
    this.todoSevice.actualizarEstado(id).subscribe(
      (res) => {
        this.alertService.success(res.mensaje);
        this.listTasks();
      },
      (err) => {
        this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }

  eliminarTarea(form: Todo) {
    Swal.fire({
      title: 'Eliminar tarea',
      text: '¿Quieres eliminar la tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#51bbe9',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoSevice.eliminarUnaTarea(form).subscribe(
          (res) => {
            this.alertService.success(res.mensaje);
            this.listTasks();
          },
          (err) => {
            this.alertService.danger(err.error.mensaje || err.statusText);
          }
        );
      } else {
        this.listTasks();
      }
    });
  }
}
