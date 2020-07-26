import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserPayload } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() isRegister = false;
  private user: UserPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
   ) { }

  onSubmit() {
    if (this.isRegister) {
      this.userService.register(this.user).subscribe(() => {
        this.flashMessage.show('Your Registration is done Successfully!',{cssClass:'alert-success',timeout:3000})
        this.router.navigateByUrl('/');
      })
    }

    this.userService.login(this.user).subscribe(() => {
      this.flashMessage.show('You are Logged in Successfully!',{cssClass:'alert-success',timeout:3000})
      this.router.navigateByUrl('/');
    });
  }
}
