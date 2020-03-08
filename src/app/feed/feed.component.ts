import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo';
import { Like } from '../models/like';
import { LikeService } from '../services/like.service';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

liked: boolean;
loggedUser: User = new User();
photos: Photo[];
like: Like = new Like();
commentsContent: string[] = new Array(100);
newComment: Comment = new Comment();
removeLikeId: number;

constructor(private userService: UserService, 
  private route: ActivatedRoute,
  private photoService: PhotoService,
  private likeService: LikeService,
  private commentService: CommentService
  ) { }

ngOnInit(): void {
  this.fetchPhotos();
}

likeDisplay(selectedPhoto: Photo, index: number){
  if(this.checkLike(selectedPhoto) == false){
    this.like.photo = selectedPhoto;
    this.like.photoId = selectedPhoto.photoId; 
    this.like.userId = this.loggedUser.userId;
    this.likeService.addLike(this.like).subscribe(
      res => this.photoService.getPhotoById(selectedPhoto.photoId).subscribe(
        photo => this.photos[index] = JSON.parse(JSON.stringify(photo)),
        error => console.log(error)
      ),
      error => console.log(error)
    );
  } else if (this.checkLike(selectedPhoto) == true) {
    this.removeLikeId = selectedPhoto.likes.filter(like => like.userId == this.loggedUser.userId)[0].likeId;
    this.likeService.removeLike(this.removeLikeId).subscribe(
      res => this.photoService.getPhotoById(selectedPhoto.photoId).subscribe(
        photo => this.photos[index] = JSON.parse(JSON.stringify(photo)),
        error => console.log(error)
      ),
      error => console.log(error)
    );
  }
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

  onComment(photo: Photo, index: number){
    this.newComment.photo=photo;
    this.newComment.userName=localStorage.getItem("currentUserName");
    this.newComment.photoId=photo.photoId;
    this.newComment.content = this.commentsContent[index];
    this.commentService.addComment(this.newComment).subscribe(
      res => this.photoService.getPhotoById(photo.photoId).subscribe(
        photo => this.photos[index] = JSON.parse(JSON.stringify(photo)),
        error => console.log(error)
      ),
       error => console.log(error)
    );
    this.commentsContent[index] = "";
    this.newComment = new Comment();
  }

  checkLike(photo: Photo){
    if(photo.likes.filter(like => like.userId == this.loggedUser.userId)[0]){
      return true;
    } else {
      return false;
    }
  }

}