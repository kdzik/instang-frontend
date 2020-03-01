import { Injectable } from '@angular/core';
import { Photo } from '../models/photo';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddPhotoService {

  constructor(private http: HttpClient) { }

  sendPhoto(photo: Photo){
    let url = "http://localhost:8080/rest/photo/add";
    let headers1 = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(url, JSON.stringify(photo), {headers: headers1});
  }


  imageUpload(uploadData){
    let url = "http://localhost:8080/rest/photo/upload";
    let headers1 =  new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.http.post(url, uploadData, {headers: headers1});
  }

  updateImage(image: Photo){
    let url = "http://localhost:8080/rest/photo/update";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(url, JSON.stringify(image), httpOptions);
  }


}
