import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  fetchUser(user){
    const url = `http://localhost:8080/auth`;
    return this.http.post<any>(url,user, {observe : 'response'});
  }
}
