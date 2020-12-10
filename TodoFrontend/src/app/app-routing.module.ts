import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
const routes: Routes = [
  { path: 'login',
  component: LoginComponent,
  pathMatch: 'full' },
  { path: 'add',
  component: TodoAddComponent,
  pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
