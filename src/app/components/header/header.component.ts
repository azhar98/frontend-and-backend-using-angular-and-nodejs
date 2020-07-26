import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user: User = null;

  constructor(
    private userService: UserService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.userService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.user = user;

      if (user) {
        this.isAdmin = user.admin;
      } else {
        this.isAdmin = false;
      }
    });

    this.userService.setCurrentUser();
  }

  onLogoutClick() {
    this.flashMessage.show('You are Logged Out Successfully!',{cssClass:'alert-success',timeout:3000})
    this.userService.logout();
  }
}
