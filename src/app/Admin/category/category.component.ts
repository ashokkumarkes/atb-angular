import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryForm  = new FormGroup({
    categoryName: new FormControl(''),
  });
  ngOnInit() {}
  onSubmit(){
    console.log(this.categoryForm.value);
  }
  
}
