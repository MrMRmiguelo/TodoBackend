import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordEmailComponent } from './components/reset-password-email/reset-password-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TodoComponent } from './components/todo/todo.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  // {path: '**',redirectTo:'/todo',pathMatch:'full'},
  { path: 'todo', component: TodoComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset_password', component: ResetPasswordEmailComponent },
  { path: 'reset_password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
