import { Component, OnInit } from '@angular/core';
import { Photo } from "../models/photo";
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  detailsModal: boolean;
  public photos: Photo[];
  public user;
  public selectedPhoto: Photo;


  constructor(private photoService: PhotoService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByName(localStorage.getItem("currentUserName")).subscribe(
      user => {
        this.user = JSON.parse(JSON.parse(JSON.stringify(user))._body);
        console.log(this.user);
        this.photoService.getPhotosByUser(this.user).subscribe(
          photos => {
            console.log(this.photos = JSON.parse(JSON.parse(JSON.stringify(user))._body).photoList);
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  onSelect(photo: Photo){
    this.selectedPhoto = photo;
    this.detailsModal = !this.detailsModal
  }

}
