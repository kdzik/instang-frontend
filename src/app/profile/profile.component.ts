import { Component, OnInit } from '@angular/core';
import { Photo } from "../models/photo";
import { PhotoService } from '../services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { Follow } from '../models/follow';
import { Like } from '../models/like';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  detailsModal: boolean;
  photos: Photo[];
  user: User = new User();
  selectedPhoto: Photo;
  liked: boolean;
  newComment: Comment = new Comment();
  loggedUser: User = new User();
  followed: string;
  removeLikeId: number;

  test: Follow = new Follow();
  test2: Follow = new Follow();

  like: Like = new Like();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private photoService: PhotoService, 
      private userService: UserService, 
      private commentService: CommentService,
      private likeService: LikeService
     ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.loggedUser.userName = localStorage.getItem("currentUserName");
    this.user.userName = this.route.snapshot.params['username'];
      this.userService.getUserByName(this.user.userName).subscribe(
        user => {
          this.user = JSON.parse(JSON.stringify(user));
          console.log(this.user);
          this.photoService.getPhotosByUser(this.user).subscribe(
            photos => {
              console.log(this.photos = JSON.parse(JSON.stringify(user)).photoList);
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      );

      this.userService.getUserByName(this.loggedUser.userName).subscribe(
        user => {
          this.loggedUser = JSON.parse(JSON.stringify(user));
          console.log("logged");
          console.log(this.loggedUser);
          if(this.loggedUser.followed.filter(user => user.userId == this.user.userId)[0]){
            this.followed = "followed";
          } else {
            this.followed = "unfollowed";
          }
          console.log("Tutaj");
        },
        err => console.log(err)
      );
  }

  onSelect(photo: Photo){
    this.newComment.content = '';
    this.selectedPhoto = photo;
    this.detailsModal = !this.detailsModal
    this.liked = this.checkLike(photo);
  }

  closeModal(){
    this.detailsModal = !this.detailsModal;
  }


  onComment(){
    console.log(this.selectedPhoto);
    console.log(this.selectedPhoto.commentList);
    this.newComment.photo=this.selectedPhoto;
    this.newComment.userName=localStorage.getItem("currentUserName");
    this.newComment.photoId=this.selectedPhoto.photoId;
    this.commentService.addComment(this.newComment).subscribe(
      res => this.photoService.getPhotoById(this.selectedPhoto.photoId).subscribe(
        photo => this.selectedPhoto = JSON.parse(JSON.stringify(photo)),
        error => console.log(error)
      ),
       error => console.log(error)
    );
    this.newComment = new Comment();
  }

  likeDisplay(){
    if(this.liked == false){
      this.like.photo = this.selectedPhoto;
      this.like.photoId = this.selectedPhoto.photoId; 
      this.like.userId = this.loggedUser.userId;
      this.likeService.addLike(this.like).subscribe(
        res => this.photoService.getPhotoById(this.selectedPhoto.photoId).subscribe(
          photo => { 
            this.selectedPhoto = JSON.parse(JSON.stringify(photo));
            this.liked = this.checkLike(this.selectedPhoto);
          },
          error => console.log(error)
        ),
        error => console.log(error)
      );
    } else if (this.liked == true) {
      this.removeLikeId = this.selectedPhoto.likes.filter(like => like.userId == this.loggedUser.userId)[0].likeId;
      this.likeService.removeLike(this.removeLikeId).subscribe(
        res => this.photoService.getPhotoById(this.selectedPhoto.photoId).subscribe(
          photo => { 
            this.selectedPhoto = JSON.parse(JSON.stringify(photo));
            this.liked = this.checkLike(this.selectedPhoto);
          },
          error => console.log(error)
        ),
        error => console.log(error)
      );
    }
  }

  onFollow(){
    console.log("Actual status " + this.followed);
      if(this.followed == "unfollowed"){
      this.followed = "followed";
      this.test2.userId = this.user.userId;
      this.test2.userName = this.user.userName;
      this.loggedUser.followed.push(this.test2);
      this.test.userId = this.loggedUser.userId;
      this.test.userName = this.loggedUser.userName;
      this.user.followers.push(this.test);
      this.userService.updateUser(this.loggedUser).subscribe();
      this.userService.updateUser(this.user).subscribe();
      this.ngOnInit();
    } else if (this.followed == "followed") {
      this.followed = "unfollowed";
      for(let i = 0; i < this.loggedUser.followed.length; i++){
        if(this.loggedUser.followed[i].userId == this.user.userId){
          this.loggedUser.followed.splice(i, 1);
        }
      }
      for(let i = 0; i < this.user.followers.length; i++){
        if(this.user.followers[i].userId == this.loggedUser.userId){
          this.user.followers.splice(i, 1);
        }
      }
      this.userService.updateUser(this.loggedUser).subscribe();
      this.userService.updateUser(this.user).subscribe();
      this.ngOnInit();
    }
  }

  checkLike(photo: Photo){
    if(photo.likes.filter(like => like.userId == this.loggedUser.userId)[0]){
      return true;
    } else {
      return false;
    }
  }

}
