import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.createForm();
  }
  
  ngOnInit(): void {}

  private createForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }
  Submit(form:Usuario){
     
    const usuario: Usuario = {
      email: form.email,
      password: form.password,
    };
    this.userService.login(usuario).subscribe(
      (res) => {
        localStorage.setItem('usertoken', res.token);
        // this.toastr.success(`Bienvenido`, 'Mensaje');
        this.router.navigate(['/todo']);
      },
      (err) => {
        // const message = err.error.message;
        console.log(err);
        
        // this.toastr.error(`${message}`, 'Alerta');
      }
    );

  }
  

}
