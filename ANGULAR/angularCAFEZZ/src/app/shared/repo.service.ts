import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


export interface Idal{
    GetAll(url:any);
    GetById(Id:any,url:string);
    Save(Entity:any,url:string);
    Edit(Entity:any,url:string);
    Delete(Id:any,url:string);
}

@Injectable({
    providedIn: 'root'
  })
  export class CrudService implements Idal {
     apiRoot:any;
     readonly rootUrl = 'http://localhost:50438/';  
    constructor(private http:HttpClient) {
  
     }
    GetAll(url:string) {
      debugger;
     return this.http.get(this.rootUrl+url,{headers:{"Authorization":"bearer "+localStorage.getItem('userToken')}});
    }
    GetById(Id:any,url:string) {
     return this.http.get(this.rootUrl+url+`${Id}`);
    }
    Save(Entity:any,url:string) {
      var reqHeader = new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken'),'content-type':'application/json'});
      // return this.http.post("http://localhost:50438/api/PostCategory",catEntity,{headers:reqHeader})
      return this.http.post(this.rootUrl+url,Entity,{headers:reqHeader});
    }
    Edit(Entity:any,url:string) {
      return this.http.put(this.rootUrl+url+`${Entity.Id}`,Entity,{headers:new HttpHeaders({"Authorization":"bearer "+localStorage.getItem('userToken'),'Content-Type': 'application/json'})});
    }
    Delete(Entity:any,url:string) {
      debugger;
      return this.http.post(this.rootUrl+url,Entity,{headers:{"Authorization":"bearer "+localStorage.getItem('userToken'),'content-type':'application/json'}});
    }
}

   
  