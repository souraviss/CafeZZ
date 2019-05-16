import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Idal, CrudService } from '../repo.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/category/category';
//import { Guid } from 'guid-typescript';
import { GuidClass } from 'src/app/shared/Guid';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  rowcount:number=1;
  constructor(private Crud:CrudService,private http:HttpClient) { }
  GetAll():Observable<any>{
    return this.Crud.GetAll('api/Categories');
  }
  save(catEntity:Category){
    debugger;

    const body= {
      Id:GuidClass.newGuid(),
      Name:catEntity.Name,
      Active:catEntity.Active
    }
    
   return this.Crud.Save(body,"api/PostCategory");
  }
  delete(category:Category)
  {
    return this.Crud.Delete(category,'api/DeleteCategory')
  }
  rowCount():number{
   return this.rowcount++;
  }
}
