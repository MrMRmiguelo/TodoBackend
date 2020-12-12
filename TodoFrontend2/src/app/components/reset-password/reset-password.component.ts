import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  passwordResetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.verifyToken();
  }

  private createForm() {
    this.passwordResetForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }
  verifyToken() {
    const token: string = this.activatedRoute.snapshot.params.token;
    this.userService.verifyToken(token).subscribe(
      (res) => {},
      (err) => {
        this.alertService.danger(err.error.mensaje);
        this.router.navigate(['/login']);
      }
    );
  }
  Submit(form: Usuario) {
    const token: string = this.activatedRoute.snapshot.params.token;
    const usuario: Usuario = {
      password: form.password,
    };
    this.userService.resetPassword(usuario, token).subscribe(
      (res) => {
 
        
        this.alertService.success(res.mensaje);
        this.router.navigate(['/login']);
      
      },
      (err) => {
        this.alertService.danger(err.error.mensaje || err.statusText);
      }
    );
  }
}
