import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  constructor(private commonService:CommonServiceService, private router: Router) {}
  message: any;
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  
  onSubmit(){
    this.commonService.login(this.myForm).subscribe(
      (res)=>{
        this.message = res.message;
        console.log(res);
        if(res.status) {
          // localStorage.setItem('token', res.Token);
          sessionStorage.setItem('token', res.Token);
          // localStorage.setItem('userID', res.userID);
          this.router.navigate(['/admin/dashboard']);
        }else {
          this.message = res.message;
        }
      });
  }

}
