import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserServiceService } from '../userServices/user-service.service';
@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private userService: UserServiceService, private route:ActivatedRoute){}
  userData: any;
  user_id: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        console.log('User ID from route:', userId);
      }
    });
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
}
