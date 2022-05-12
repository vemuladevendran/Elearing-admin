import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/services/issue/issue.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  issueDetails: any[] = [];
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private issueServe: IssueService
  ) { }


  async getIssueDetails(): Promise<void> {
    try {
      this.loader.show();
      this.issueDetails = await this.issueServe.getIssueList();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }


  async deleteIssue(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.issueServe.deleteIssue(id);
        this.toast.success("Deleted");
        this.getIssueDetails();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      } finally {
        this.loader.hide();
      }
    }
  };


  ngOnInit(): void {
    this.getIssueDetails();
  }

}
