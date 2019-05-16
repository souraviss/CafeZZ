import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router,private toastr:ToastrService) { }

  ngOnInit() {
  }
  
  OnSubmit(userName,password,form?: NgForm){
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     localStorage.setItem('userRoles',data.role);
     this.router.navigate(['/home']);
   },(err : HttpErrorResponse)=>{
      this.toastr.error("Login failed");
      this.isLoginError = true;
   });
 }
}
