import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  awsVideoUrl = environment.AWS_DOMAIN_URL;
  @Input() currentVideoDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

}
