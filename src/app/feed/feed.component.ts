import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

liked: boolean;
loggedUser: User = new User();
photos: Photo[];

like(){
  this.liked = !this.liked;
}

  constructor(private userService: UserService, 
    private route: ActivatedRoute,
    private photoService: PhotoService
    ) { }

  ngOnInit(): void {
    this.liked = true;
    this.fetchPhotos();
  }

  fetchPhotos(){
    this.loggedUser.userName = localStorage.getItem("currentUserName");
    console.log(this.loggedUser.userName);
  this.userService.getUserByName(this.loggedUser.userName).subscribe(
    user => {
      this.loggedUser = JSON.parse(JSON.stringify(user));
      console.log(this.loggedUser);
      this.photoService.getFollowedUsersPhotos(this.loggedUser).subscribe(
        data => {
          this.photos = JSON.parse(JSON.stringify(data));
          console.log(this.photos);
        },
        err => console.log(err)
      )},
    err => console.log(err)
  );
  }

  checkLike(photo: Photo){
    if(photo.likedByUserList.filter(user => user.userId == this.loggedUser.userId)[0]){
      this.liked = true;
      console.log("liked");
      console.log(this.liked);
    } else {
      this.liked = false;
      console.log("unliked");
      console.log(this.liked);
    }
    return this.liked;
  }
}