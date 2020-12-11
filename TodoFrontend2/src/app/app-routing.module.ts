import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {path: '',redirectTo:'/todo',pathMatch:'full'},
  // {path: '**',redirectTo:'/todo',pathMatch:'full'},
  {path:'todo',component:TodoComponent,canActivate:[GuardGuard]},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
