import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  Submit(form: Usuario) {
    const usuario: Usuario = {
      email: form.email,
      password: form.password,
    };
    this.userService.register(usuario).subscribe(
      (res) => {
        localStorage.setItem('userToken', res.token);
        this.alertService.success(`Bienvenido`);
        this.router.navigate(['/todo']);
      },
      (err) => {
        // const message = err.error.message;

        this.alertService.danger(err.error.mensaje);
        // this.toastr.error(`${message}`, 'Alerta');
      }
    );
  }
}
