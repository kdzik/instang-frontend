import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Photo } from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos() {
    let url = "http://localhost:8080/photo/allPhotos";
    return this.http.get(url);
  }

  getPhotosByUser(user: User){
    let url = "http://localhost:8080/rest/photo/user";
    let getHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.post(url, JSON.stringify(user), {headers: getHeaders});
  }

  getPhotoById (photoId: number) {
    let tokenUrl1 = "http://localhost:8080/rest/photo/photoId";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.http.post(tokenUrl1, JSON.stringify(photoId), {headers: headers1});
  }

  updatePhoto(photo: Photo) {
    let tokenUrl1 = "http://localhost:8080/rest/photo/update";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.http.post(tokenUrl1, JSON.stringify(photo), {headers: headers1});
  }
}