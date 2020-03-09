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
setAsAvatar: boolean
users: User[];
matchingUsers: User[];
searchInput: string;

  constructor(private loginService: LoginService, private userService: UserService, private addPhotoService: AddPhotoService) { }

  ngOnInit(): void {
    this.loggedUserName = localStorage.getItem("currentUserName");
    this.searchUsers();
  }

  onFileSend() {
    this.userService.getUserByName(this.loggedUserName).subscribe(
      user => {
        this.user = JSON.parse(JSON.stringify(user));
        console.log(this.user);
        this.newPhoto.user = this.user;
        this.newPhoto.userName = this.user.userName;
        this.addPhotoService.sendPhoto(this.newPhoto).subscribe(
          data => {
            this.photoAdded = true;
            window.location.reload();
        
            this.newPhoto = new Photo();
            if(this.setAsAvatar == true){
              this.user.avatarId = JSON.parse(JSON.stringify(data)).photoId;
              this.userService.updateUser(this.user).subscribe();
            }
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
  
  searchUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.users = JSON.parse(JSON.stringify(res));
        console.log(this.users);
      },
      err => console.log(err)
    );
  }

  onSearch(event: any){
    this.matchingUsers = this.users.filter(user => user.userName.includes(event.target.value));
  }

}
