import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  Submit(form: Usuario) {
    const usuario: Usuario = {
      email: form.email,
      password: form.password,
    };
    this.userService.login(usuario).subscribe(
      (res) => {
        localStorage.setItem('userToken', res.token);
        this.alertService.success(`Bienvenido`);
        this.router.navigate(['/todo']);
      },
      (err) => {
        
        this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }
}
