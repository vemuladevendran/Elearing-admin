import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() videosList: any[] = [];
  awsVideoUrl = environment.AWS_DOMAIN_URL;

  constructor() { }

  ngOnInit(): void {
  }

}
