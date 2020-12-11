import { Component, OnInit } from '@angular/core';
import { UserGuard } from 'src/app/guards/user.guard';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

}
