import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-user',
  imports: [CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  isHidden: boolean = false;
  ngOnInit(){
    this.isHidden = true;
  }
  onChange(event: any){
    if(event.target.value == 2){
      this.isHidden = false;
    }else{
      this.isHidden = true;
    }
  }
}
