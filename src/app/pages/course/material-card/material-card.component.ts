import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent implements OnInit {
  materialsList = Array(30).fill('');
  constructor() { }

  ngOnInit(): void {
  }

}
