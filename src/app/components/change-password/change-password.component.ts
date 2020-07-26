import { Component, OnInit, Input} from '@angular/core';
import { UserPayload, User } from '../../models/user.model';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

isAdmin: boolean = false;
   user: any = {
     _id :'',
    password: '',
    cpassword: ''
   
  };
  
  
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private flashMessage: FlashMessagesService,
    private location: Location
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.user._id=id

   
  }
 

  onSubmit(){
    
    if(this.user.password==''|| this.user.password.trim()==='' || this.user.cpassword =='' || this.user.cpassword.trim()===''){
     alert('Please fill all Details')
     return;
    } else if(this.user.password !== this.user.cpassword){
      alert("Don't Match Password & Conform Password")
      return;
    }
     console.log(this.user.password,this.user.cpassword)
   //alert('success')
   console.log(this.user._id)
   this.userService.editUser(this.user._id,this.user).subscribe(() => {
    this.flashMessage.show('Your Password has changed Successfully!',{cssClass:'alert-success',timeout:3000})
    this.location.back();
  });
   
}
onCancelClick() {
  this.location.back();
}

}
