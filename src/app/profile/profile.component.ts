import { Component, OnInit } from '@angular/core';
import { Photo } from "../models/photo";
import { PhotoService } from '../services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  detailsModal: boolean;
  photos: Photo[];
  user: User;
  selectedPhoto: Photo;
  liked: string;
  newComment: Comment = new Comment();
  userName: string;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private photoService: PhotoService, 
      private userService: UserService, 
      private commentService: CommentService
     ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.userName = this.route.snapshot.params['username'];
    if(this.userName == null){
      this.userName = localStorage.getItem("currentUserName");
    }

      this.userService.getUserByName(this.userName).subscribe(
        user => {
          this.user = JSON.parse(JSON.stringify(user));
          console.log(this.user);
          this.photoService.getPhotosByUser(this.user).subscribe(
            photos => {
              console.log(this.photos = JSON.parse(JSON.stringify(user)).photoList);
              console.log(this.photos);
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
  }

  onSelect(photo: Photo){
    this.newComment.content = '';
    this.selectedPhoto = photo;
    this.detailsModal = !this.detailsModal
    if(this.user.likedPhotoList.filter(photo => photo.photoId == this.selectedPhoto.photoId)[0]){
      this.liked = "liked";
    } else {
      this.liked = "unliked";
    }
  }

  closeModal(){
    this.detailsModal = !this.detailsModal;
  }

  likeDisplay(){
    if(this.liked == "unliked"){
      this.liked = "liked"
      this.user.likedPhotoList.push(this.selectedPhoto);
      console.log(this.user);
      this.selectedPhoto.likes+=1;
      this.userService.updateUser(this.user).subscribe();
      this.photoService.updatePhoto(this.selectedPhoto).subscribe();

      this.ngOnInit();

    } else if (this.liked == "liked") {
      this.liked = "unliked";
      for(let i = 0; i < this.user.likedPhotoList.length; i++){
        if(this.user.likedPhotoList[i].photoId == this.selectedPhoto.photoId){
          this.user.likedPhotoList.splice(i, 1);
        }
      }
      this.selectedPhoto.likes-=1;
      this.userService.updateUser(this.user).subscribe();
      this.photoService.updatePhoto(this.selectedPhoto).subscribe();
    }
  }

  onComment(){
    console.log(this.selectedPhoto);
    console.log(this.selectedPhoto.commentList);
    this.newComment.photo=this.selectedPhoto;
    this.newComment.userName=localStorage.getItem("currentUserName");
    this.newComment.photoId=this.selectedPhoto.photoId;
    this.commentService.addComment(this.newComment).subscribe(
      photo => this.photoService.getPhotoById(this.selectedPhoto.photoId).subscribe(
        photo => this.selectedPhoto = JSON.parse(JSON.stringify(photo)),
        error => console.log(error)
      )
      // error => console.log(error)
    );
    // this.selectedPhoto.commentList.push(this.newComment);


    this.newComment = new Comment();
  }

}
