import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
productentry:Product[];
  constructor(private data:ProductService) { }
  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct():void{
    debugger;
    this.data.GetAll().subscribe((data:Product[])=>this.productentry=data,
    (err:any)=>console.log(err),
    )
  }
}
