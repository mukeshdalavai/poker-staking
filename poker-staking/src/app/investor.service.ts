import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  constructor(private http:HttpClient) { }

  fetchInvestors(){
    const url = `http://localhost:8060/`;
    return this.http.get<any>(url);
  }

  fetchInvestor(username){
    const url = `http://localhost:8060/investor/${username}`;
    return this.http.get<any>(url);
  }

  placeOrder(body){
    const url = `http://localhost:8060/order`;
    return this.http.post<any>(url, body);
  }
}
