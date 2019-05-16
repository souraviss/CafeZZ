import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CrudService } from '../shared/repo.service';
import { CategoryService } from '../shared/category/category.service';
import { Category } from './category';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryentry:Category[];
  SuccessAuthetication:boolean
  display='none';
  @ViewChild('catName') inputName: ElementRef;
  @ViewChild('chkActive') inputActive: ElementRef;

  constructor(private data:CategoryService,private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllCatgory();
  }
getAllCatgory():void{
  this.data.GetAll().subscribe((data:Category[])=>this.categoryentry=data,
  (err:any)=>console.log(err),
 )
}
onClickSubmit(cat:Category){
  //var category=cat;
  this.data.save(cat).subscribe((data:any)=>{
    this.toastr.success("Insert Successfull done")
    this.getAllCatgory();
    this.inputName.nativeElement.value='';
    this.inputActive.nativeElement.value='';
    this.display='none';
  })
   
}

delete(cat:Category):void{
  debugger;
 this.data.delete(cat).subscribe((data:any)=>{
   this.toastr.success("delete successfully");
   this.getAllCatgory();
 })
}

ModalOpen():void{
this.display='block';
}
ModalClose():void{
  this.display='none';
}

}
