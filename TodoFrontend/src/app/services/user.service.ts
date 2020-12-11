import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  getToken(): string {
    console.log('token');
    return localStorage.getItem('userToken');
  }
  loggedUser(): boolean { 
    return !!localStorage.getItem('userToken');   
  }
  loggedOut(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
