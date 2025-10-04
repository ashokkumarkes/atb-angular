import { Component } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-country-code',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  title = 'Category List';
  constructor(private commonServie : CommonServiceService) { }
  categoryList:any[] = [];
  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList(){
    this.commonServie.getCategoryList().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
}
