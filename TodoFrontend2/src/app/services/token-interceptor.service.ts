import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private userService: UserService) {}
  intercept(req, next): any {
    const token = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    });

    return next.handle(token);
  }
}
