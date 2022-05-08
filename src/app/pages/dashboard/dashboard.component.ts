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
  constructor(
    private dashboardServe: DashboardService,
    private loader: LoaderService,
    private toast: ToastrService,
  ) {

  }


  async getDashboardCount(): Promise<void> {
    try {
      this.loader.show();
      this.dashBoardCount = await this.dashboardServe.getDashboardCount();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDashboardCount();
  }

}
