import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../userServices/user-service.service';
@Component({
  selector: 'app-user-image',
  imports: [CommonModule],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css'
})
export class UserImageComponent {

  @Output() idClicked = new EventEmitter<string>();

  constructor(private userService: UserServiceService) {}
  userData: any;
  ngOnInit() {
    
    this.getUserData();
  }
  getUserData(){
     this.userService.getUsers().subscribe((res: any)=>{
      if(res.status===true){
        this.userData = res.result;
      }
    }
    );
  } 
  useID(event: any) {
    this.idClicked.emit(event);
  }
}
