import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

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
    let url = "http://localhost:8080/photo/user";
    return this.http.post(url, JSON.stringify(user));
  }
}