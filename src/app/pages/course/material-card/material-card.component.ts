import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent implements OnInit {
  @Input() materialsList: any[] = [];
  selectedPdf: any;
  awsVideoUrl = environment.AWS_DOMAIN_URL;

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
