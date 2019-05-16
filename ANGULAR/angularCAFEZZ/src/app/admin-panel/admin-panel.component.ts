import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  userClaims: any;
  title:any;
  constructor(private router: Router, private userService: UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });
    debugger;
    if(this.userService.roleMatch(['User'])|| this.userService.roleMatch(['SalePerson']))
    {
      this.title=localStorage.getItem('userRoles');
      //do the operation

    }
    else
    {
      this.title="Admin Role";
    }

  }

}
