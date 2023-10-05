import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  private baseUrl = 'http://localhost:3000/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}
  UserRegister(userData: any): Observable<any>{
    const url = `${this.baseUrl}/users/register`;
    return this.http.post(url, userData);
  }

  UserLogin(userData: any): Observable<any>{
    const url = `${this.baseUrl}/users/login`;
    return this.http.post(url, userData);
  }


}
