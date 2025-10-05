import { Component } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-country-code',
  imports: [CommonModule],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css'
})
export class BrandsListComponent {
  title = 'Brands List';
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
