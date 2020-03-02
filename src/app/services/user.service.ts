import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];

  constructor(private http: HttpClient) { }

  getUsers(){
  
  }
/*
  getUserById(id: number){
    let tokenUrl = 'http://localhost:8080/rest/user/id/'+id;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.http.post(tokenUrl, id, {headers: headers});
  }
*/
  getUserByName(username: string) {
    let tokenUrl = 'http://localhost:8080/rest/user/'+username;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.http.post(tokenUrl, username, {headers: headers});
  }

  updateUser(user: User) {
    let tokenUrl1 = "http://localhost:8080/rest/user/update";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.http.put(tokenUrl1, JSON.stringify(user), {headers: headers1});
  }

}
