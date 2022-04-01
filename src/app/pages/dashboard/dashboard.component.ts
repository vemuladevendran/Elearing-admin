import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService,
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
    try {
      this.loader.show();
      this.dashBoardCount = await this.dashboardServe.getDashboardCount();
      this.claculateProgressBarWidth()
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  claculateProgressBarWidth(): void {
    const totalBooks = (this.dashBoardCount[0] * 100) / this.dashBoardCount[0];
    const returnedBooks = (this.dashBoardCount[1] * 100) / this.dashBoardCount[0];
    const issuedBooks = (this.dashBoardCount[2] * 100) / this.dashBoardCount[0];
    const dueBooks = (this.dashBoardCount[3] * 100) / this.dashBoardCount[0];
    this.progressBarWith.push(totalBooks, returnedBooks, issuedBooks, dueBooks);
  }

  // create youtube link
  async createYoutubeLink(): Promise<void> {
    try {
      this.loader.show();
      if (this.youtubeForm.value.videoLink) {
        const productPreviewURL = new URL(this.youtubeForm.value.videoLink);
        this.youtubeForm.value.videoLink = productPreviewURL.searchParams.get('v');
      }
      await this.dashboardServe.createYoutubeLive(this.youtubeForm.value);
      this.toast.success("Uploaded");
      this.getYoutubeLink();
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to create")
    } finally {
      this.loader.hide();
    }
  }

  async getYoutubeLink(): Promise<void> {
    try {
      this.loader.show();
      this.youtubeLinkDetails = await this.dashboardServe.getYoutubeLink();
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeLinkDetails?.videoLink}`);
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to get link")
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDashboardCount();
    this.getYoutubeLink();
  }

}
