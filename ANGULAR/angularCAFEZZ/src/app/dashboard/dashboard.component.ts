import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category/category.service';
import { Category } from '../category/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  countStock:any;
  
  constructor(private data:CategoryService) { }

  ngOnInit() {
    this.countStock=7;
    
  }
 
}
