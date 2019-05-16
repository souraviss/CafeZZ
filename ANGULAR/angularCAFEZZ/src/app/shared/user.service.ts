import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from './user.module.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:50438/';
  constructor(private http:HttpClient) { }

  registerUser(user: User,roles:string[]) {

    const body= {

      UserName: user.UserName,

      Password: user.Password,

      Email: user.Email,

      Roles: roles

    }
    debugger;
    var reqHeader = new HttpHeaders({'No-Auth':'True'});

    return this.http.post(this.rootUrl + 'api/User/Register', body,{headers : reqHeader});

  }
  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + 'api/GetAllRoles', { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + 'token', data, { headers: reqHeader });
  }



  getUserClaims(){
   return  this.http.get(this.rootUrl+'api/User/Claims',{headers:{"Authorization":"bearer "+localStorage.getItem('userToken')}});
  }


  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
