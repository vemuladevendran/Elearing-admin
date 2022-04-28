import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() videosList: any[] = [];
  defaultThumbnailImg = "/assets/video-default-thumbnail-img.webp";

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (this.videosList === null) {
      this.videosList = [];
    }
  }

}
