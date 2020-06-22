import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  fetchPlayers(){
    const url = `http://localhost:8070/`;
    return this.http.get(url);
  }

  fetchPlayer(username){
    const url = `http://localhost:8070/player/${username}`;
    return this.http.get<any>(url);
  }

  addTournament(data){
    const url = `http://localhost:8070/tournament`;
    return this.http.post<any>(url, data);
  }
}
