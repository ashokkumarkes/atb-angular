import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) {}

  isLoggedIn():Boolean {
    // return !!localStorage.getItem('token');
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userID');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
