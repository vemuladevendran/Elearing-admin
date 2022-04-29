import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent implements OnInit {
  @Input() materialsList: any[] = [];
  selectedPdf: any;
  constructor() { }

  ngOnInit(): void {
    if (this.materialsList === null) {
      this.materialsList = [];
    }
  };

  viewPdf(pdfSrc: any): void {
    this.selectedPdf = pdfSrc;
  }

  removeSelectedPdf(): void{
    this.selectedPdf = null;
  }
}
