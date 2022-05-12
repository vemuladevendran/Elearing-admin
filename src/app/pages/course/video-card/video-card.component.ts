import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() deleteVideoId = new EventEmitter<string>();

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

  // Emit the video id to delete the video
  deleteVideo(id: string) {
    this.deleteVideoId.emit(id);
  }

}
