import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.sass']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[];
  selectedPhoto: Photo;


  constructor(private photoService: PhotoService) {
   }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(
      data => {
        console.log(this.photos = JSON.parse(JSON.parse(JSON.stringify(data))._body));
      },
      error => {
        console.log(error);
      }
    );
  }

}
