import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.module.model';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles : any[];
  constructor(private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
    debugger;
    this.userService.getAllRoles().subscribe(

      (data : any)=>{

        data.forEach(obj => obj.selected = false);
        console.log(data);
        this.roles = data;

      }

    );
  }
  resetForm(form?: NgForm) {

    if (form != null)

      form.reset();

    this.user = {

      UserName: '',

      Password: '',

      Email: '',
    }
    if (this.roles)
    this.roles.map(x => x.selected = false);
  }
  OnSubmit(form: NgForm) {
    var role = this.roles.filter(x => x.selected).map(y => y.Name);
    this.userService.registerUser(form.value,role)

      .subscribe((data: any) => {

        if (data.Succeeded == true) {

          this.resetForm(form);

          this.toastr.success('User registration successful');

        }

        else

          this.toastr.error(data.Errors[0]);

      });

  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }
}
