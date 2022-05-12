import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/services/issue/issue.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.scss']
})
export class ViewIssueComponent implements OnInit {
  issueId = '';
  issueDetails: any;
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private issueServe: IssueService
  ) {
    this.issueId = this.route.snapshot.paramMap.get("id") ?? '';
  }


  async getIssueDetail(id: string): Promise<void> {
    try {
      this.loader.show();
      this.issueDetails = await this.issueServe.getIssueById(id);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getIssueDetail(this.issueId);
  }

}
