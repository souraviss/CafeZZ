import { Injectable } from '@angular/core';
import { CrudService } from './repo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  rowcount:number=1;
  constructor(private Crud:CrudService) { }
  GetAll():Observable<any>{
    return this.Crud.GetAll('api/Products');
  }
  rowCount():number{
   return this.rowcount++;
  }
}
