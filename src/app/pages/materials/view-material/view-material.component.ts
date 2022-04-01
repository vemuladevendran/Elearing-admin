import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss']
})
export class ViewMaterialComponent implements OnInit {
  details: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.details = this.data.data;
  }

}
