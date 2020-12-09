import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
