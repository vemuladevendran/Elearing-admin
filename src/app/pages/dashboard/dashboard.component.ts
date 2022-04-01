import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashBoardCount: any[] = [];
  progressBarWith: any[] = [];
  youtubeForm: FormGroup;
  youtubeLinkDetails: any;
  youtubeLink: SafeResourceUrl | string = '';
  constructor(
    private dashboardServe: DashboardService,
    private loader: LoaderService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
    this.youtubeForm = this.fb.group({
      videoTitle: ['', [Validators.required]],
      videoLink: ['', [Validators.required]],
      preferredYear: ['', [Validators.required]],
    })
  }


  async getDashboardCount(): Promise<void> {
   
  }

  ngOnInit(): void {
   
  }

}
