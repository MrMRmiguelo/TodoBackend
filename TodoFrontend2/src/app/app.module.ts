import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guards/guard.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
// Import BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import your library
import { AlertModule } from '@full-fledged/alerts';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './components/reset-password-email/reset-password-email.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ResetPasswordComponent,
    ResetPasswordEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'}),
  ],
  providers: [
    GuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
