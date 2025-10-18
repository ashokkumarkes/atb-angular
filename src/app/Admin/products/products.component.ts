import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonServiceService } from '../../common-service.service';
@Component({
  selector: 'app-products',
  // standalone: false,
  imports:[ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private commonServiceService : CommonServiceService){

  }

  addToProduct = new FormGroup({
    productType :new FormControl(''),
  });

  onSubmit(){
    this.commonServiceService.addToProduct(this.addToProduct).subscribe((res)=>{
        console.log(res);
    });
  }
}
