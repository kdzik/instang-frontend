import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  addLike(like: Like){
    let tokenUrl1 = "http://localhost:8080/rest/like/add";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    console.log(JSON.stringify(like));
    return this.http.post(tokenUrl1, JSON.stringify(like), {headers: headers1});
  }

  removeLike(likeId: number){
    let tokenUrl1 = "http://localhost:8080/rest/like/remove";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
   // console.log(JSON.stringify(likeId));
    return this.http.post(tokenUrl1, likeId, {headers: headers1});
  }
}
