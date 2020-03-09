import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Follow } from '../models/follow';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];

  constructor(private http: HttpClient) { }

  getUsers() {
    let tokenUrl = 'http://localhost:8080/rest/user/users';
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.http.get(tokenUrl, {headers: headers});
  }

  getUsersStartingWith(userName: string){
    let tokenUrl = 'http://localhost:8080/rest/user/starting';
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.http.post<User[]>(tokenUrl, userName, {headers: headers});
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

  updateFollow(follow: Follow){
    let tokenUrl1 = "http://localhost:8080/rest/user/update/followers";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.http.put(tokenUrl1, JSON.stringify(follow), {headers: headers1});
  }

}
