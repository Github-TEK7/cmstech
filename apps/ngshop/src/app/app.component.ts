import { Component, OnInit } from '@angular/core';
import { UsersService } from '@frontend/users';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private userService: UsersService) {

  } 

  ngOnInit() {
    this.userService.initAppSession();
  }

  title = 'ngshop';
}
