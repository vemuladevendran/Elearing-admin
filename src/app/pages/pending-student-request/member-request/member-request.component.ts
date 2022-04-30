import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

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

  // approve student
  async approveRequest(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure you want to approve?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
    });
    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.studentServe.approveRequest(id);
        this.getPendingRequest();
        this.toast.success("Approved")
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error?.message);
      } finally {
        this.loader.hide();
      }
    }
  }

  // reject request
  async rejectRequest(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure you want to Reject?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#ebb309',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject',
    });
    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.studentServe.rejectRequest(id);
        this.getPendingRequest();
        this.toast.success("Reject")
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error?.message);
      } finally {
        this.loader.hide();
      }
    }
  }

  ngOnInit(): void {
    this.getPendingRequest();
  }

}
