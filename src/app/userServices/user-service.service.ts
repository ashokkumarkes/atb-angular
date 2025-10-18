import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }

  private readonly BASE_URL = 'https://localhost:5000/api';

  getUsers() {
    return this.http.get(`${this.BASE_URL}/auth/users-list`);
  }
}
