import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css'],
})
export class ResetPasswordEmailComponent implements OnInit {
  emailResetForm: FormGroup;
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
    this.emailResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  Submit(form: Usuario) {
    const usuario: Usuario = {
      email: form.email,
    };
    this.userService.resetPasswordEmail(usuario).subscribe(
      (res) => {
        console.log(res);
        
      this.alertService.success(res.mensaje);
        this.router.navigate(['/login']);
      },
      (err) => {
 
       this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }
}
