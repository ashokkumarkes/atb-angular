import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  private readonly BASE_URL = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}
  login(data:any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, data.value);
  }

  addHsnCode(data:any){
    return this.http.post(`${this.BASE_URL}/masters/add-hsn-code`, data.value);
  }

  getHsnCodeList(page: number = 1, limit: number = 20){
    return this.http.get(`${this.BASE_URL}/masters/hsn-code-list?page=${page}&limit=${limit}`);
  }
}
