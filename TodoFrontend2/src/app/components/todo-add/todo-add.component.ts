import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
 addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoSevice: TodoService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }
  private createForm() {
    this.addForm = this.formBuilder.group({
      tarea:['',Validators.required],
      detalleTarea: ['', Validators.required],
    });
  }
  Submit(form: Todo) {
    const todo: Todo = {
      tarea: form.tarea,
      detalleTarea: form.detalleTarea,
    };
    this.todoSevice.agregarUnaTarea(todo).subscribe(
      (res) => {
        this.alertService.success(res.mensaje);
        this.router.navigate(['/todo']);
      },
      (err) => {
        this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }
}
