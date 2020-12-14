import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  listas:Todo[];
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
}
