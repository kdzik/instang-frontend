import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

liked: boolean;

like(){
  this.liked = !this.liked;
}

  constructor() { }

  ngOnInit(): void {
    this.liked = true;
  }

}
