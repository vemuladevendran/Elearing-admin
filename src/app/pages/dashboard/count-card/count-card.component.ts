import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent implements OnInit {
  @Input() details: any;
  constructor() { }

  ngOnInit(): void {
  }

}
