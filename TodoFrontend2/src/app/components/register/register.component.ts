import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  public errorAlert:string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createForm();
  }
  
  ngOnInit(): void {}

  private createForm(){
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }
  Submit(form:Usuario){
     
    const usuario: Usuario = {
      email: form.email,
      password: form.password,
    };
    this.userService.register(usuario).subscribe(
      (res) => {
        localStorage.setItem('usertoken', res.token);
        // this.toastr.success(`Bienvenido`, 'Mensaje');
        this.router.navigate(['/todo']);
      },
      (err) => {
        this.errorAlert=err.error.mensaje;
        
        // const message = err.error.message;
        console.log(err);
        
        // this.toastr.error(`${message}`, 'Alerta');
      }
    );

  }

}
