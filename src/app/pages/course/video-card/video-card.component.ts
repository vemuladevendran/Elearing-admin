import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() videosList: any[] = [];
  defaultThumbnailImg = "/assets/video-default-thumbnail-img.webp";
  awsVideoUrl = environment.AWS_DOMAIN_URL;
  currentVideoDetails: any;
  constructor(
  ) { }

  ngOnInit(): void {
    if (this.videosList === null) {
      this.videosList = [];
    }
    this.setVideo();
  }

  setVideo(): void {
    setTimeout(() => {
      this.currentVideoDetails = this.videosList[0];
    }, 1000);
  }

  playSelectedVideo(video: any) {
    this.currentVideoDetails = video;
  }

}
