import { Component, OnInit } from '@angular/core';
import { Photo } from "../models/photo";
import { PhotoService } from '../services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { Follow } from '../models/follow';

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
  liked: string;
  newComment: Comment = new Comment();
  loggedUser: User = new User();
  followed: string;

  test: Follow = new Follow();
  test2: Follow = new Follow();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private photoService: PhotoService, 
      private userService: UserService, 
      private commentService: CommentService
     ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.loggedUser.userName = localStorage.getItem("currentUserName");
    this.user.userName = this.route.snapshot.params['username'];
    // if(this.loggedUser.userName == null){
    //   this.loggedUser.userName = localStorage.getItem("currentUserName");
    // }

      this.userService.getUserByName(this.user.userName).subscribe(
        user => {
          this.user = JSON.parse(JSON.stringify(user));
          console.log(this.user);
          this.photoService.getPhotosByUser(this.user).subscribe(
            photos => {
              console.log(this.photos = JSON.parse(JSON.stringify(user)).photoList);
          //    console.log(this.photos);
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

  onFollow(){
    console.log(this.followed);
      if(this.followed == "unfollowed"){
      this.followed = "followed";
                  console.log("pushuje");
     // this.test2 = Object.assign({}, this.user);
      this.test2.userId = this.user.userId;
      this.test2.userName = this.user.userName;
      // this.test2.followers.length = 0;
      // this.test2.followed.length = 0;
     this.loggedUser.followed.push(this.test2);
              console.log("FOLLOWed");
           //   console.log(this.test2);
               console.log(this.loggedUser);
    // this.test = Object.assign({}, this.loggedUser);
 //   this.test = JSON.parse(JSON.stringify(this.loggedUser));
    this.test.userId = this.loggedUser.userId;
    this.test.userName = this.loggedUser.userName;
             // console.log("test");
            //  console.log(this.test);
           //   console.log(this.loggedUser);
    // this.test.followers.length = 0;
   //  this.test.followed.length = 0;
    this.user.followers.push(this.test);
                console.log("followers");
              console.log(this.user);
             //   console.log(this.test);
      this.userService.updateUser(this.loggedUser).subscribe();
      this.userService.updateUser(this.user).subscribe();
   //   this.ngOnInit();

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
    }
  }

}
  // if(this.followed == "unfollowed"){
    //   this.followed = "followed";
    //   this.user.followed = [];
    //   this.user.followers = [];
    //   console.log(this.user);
    //   console.log("pushuje");
    //  this.loggedUser.followed.push(this.user);
    //  console.log(this.loggedUser);
    //  console.log("PRZERWA");
    //  this.loggedUser.followed =  [];
    //  this.loggedUser.followers = [];
    //   this.user.followers.push(this.loggedUser);
    //   console.log(this.user);
    //   this.userService.updateUser(this.loggedUser).subscribe();
    //   this.userService.updateUser(this.user).subscribe();
    //   this.ngOnInit();

    // } else if (this.followed == "followed") {