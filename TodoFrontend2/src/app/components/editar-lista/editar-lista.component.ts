import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-editar-lista',
  templateUrl: './editar-lista.component.html',
  styleUrls: ['./editar-lista.component.css'],
})
export class EditarListaComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoSevice: TodoService,
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  private createForm() {
    this.editForm = this.formBuilder.group({
      tarea: ['', Validators.required],
      detalleTarea: ['', Validators.required],
    });
  }
  cargarDatos() {
    const id: string = this.activatedRoute.snapshot.params.id;
    this.todoSevice.obtenerUnaTarea(id).subscribe(
      (res) => {
        this.editForm.patchValue({
          tarea: res.tarea,
          detalleTarea: res.detalleTarea,
        });
      },
      (err) => {
        this.alertService.danger(err.error.mensaje || err.statusText);
        this.router.navigate(['/todo']);
      }
    );
  }
  Submit(form: Todo) {
    const id: string = this.activatedRoute.snapshot.params.id;
    const todo: Todo = {
      tarea: form.tarea,
      detalleTarea: form.detalleTarea,
    };
    this.todoSevice.actualizarUnaTarea(todo, id).subscribe(
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
