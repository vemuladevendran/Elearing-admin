import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnroleCourseService } from 'src/app/services/enrole-course/enrole-course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-course-request',
  templateUrl: './pending-course-request.component.html',
  styleUrls: ['./pending-course-request.component.scss']
})
export class PendingCourseRequestComponent implements OnInit {
  enroleRequest: any[] = [];
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private enroleCourseServe: EnroleCourseService
  ) { }




  async getRequestedCourse(): Promise<void> {
    try {
      this.loader.show();
      this.enroleRequest = await this.enroleCourseServe.getEnroleRequestCourse();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  }

  // accept request
  async approveRequest(request: any): Promise<void> {
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
        const requestDetails = {
          courseId: request.course._id,
          userId: request.user._id,
        }
        await this.enroleCourseServe.acceptCourseRequest(requestDetails);
        this.getRequestedCourse();
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
  async rejectRequest(request: any): Promise<void> {
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
        const requestDetails = {
          courseId: request.course._id,
          userId: request.user._id,
        }
        await this.enroleCourseServe.rejectCourseRequest(requestDetails);
        this.getRequestedCourse();
        this.toast.success("Rejected")
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error?.message);
      } finally {
        this.loader.hide();
      }
    }
  }

  ngOnInit(): void {
    this.getRequestedCourse();
  }

}
