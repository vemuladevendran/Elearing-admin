import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.scss']
})
export class MemberRequestComponent implements OnInit {
  members: any[] = [];
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private studentServe: StudentsService
  ) { }


  async getPendingRequest(): Promise<void> {
    try {
      this.loader.show();
      this.members = await this.studentServe.getPendingRequest({ role: 'member' });
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getPendingRequest();
  }

}
