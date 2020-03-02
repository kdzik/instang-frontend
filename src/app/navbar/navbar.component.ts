import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { AddPhotoService } from '../services/add-photo.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

uploadModal: boolean;

newPhoto: Photo = new Photo();
photoAdded: boolean = false;
user: User;
selectedFile: File = null;
loggedUserName: string;

  constructor(private loginService: LoginService, private userService: UserService, private addPhotoService: AddPhotoService) { }

  ngOnInit(): void {
    this.loggedUserName = localStorage.getItem("currentUserName");
  }

  onFileSend() {
    this.userService.getUserByName(this.loggedUserName).subscribe(
      user => {
        this.user = JSON.parse(JSON.stringify(user));
        console.log(this.user);
        this.newPhoto.user = this.user;
        this.addPhotoService.sendPhoto(this.newPhoto).subscribe(
          data => {
            this.photoAdded = true;
            this.newPhoto = new Photo();
          },
          err => console.log(err)
        )
      },
      err => {console.log(err)
      console.log("ERROR")}
    )
  }


  uploadImg(){
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.newPhoto.photoName = this.selectedFile.name;
    console.log(uploadData);
    console.log(this.selectedFile);
    this.addPhotoService.imageUpload(uploadData)
    .subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
        //    this.progress = Math.round(event.loaded / event.total * 100);
          //  console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Image successfully sent', event.body);
         //   setTimeout(() => {
        //      this.progress = 0;
       //     }, 1500);
  
        }
      },
      err => {
        console.log("Error occured during saving: " + err)
      }
    );
  }


  onFileChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.uploadImg();
  }

  isLoggedIn(){
    return this.loginService.checkLogin();
  }

  logout(){
    this.loginService.logout();
  }

}
