import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-enable-membership',
  templateUrl: './enable-membership.component.html',
  styleUrls: ['./enable-membership.component.scss']
})
export class EnableMembershipComponent implements OnInit {
  rollNumber = new FormControl();
  year = new FormControl();
  studentData: any;
  bookData: any;
  constructor(
    private studentServe: StudentService,
    private loader: LoaderService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async getStudentDetails(): Promise<void> {
    try {
      if (this.rollNumber.value === null) {
        this.toast.info('Please Enter Roll Number');
        return;
      }
      this.loader.show();
      this.studentData = await this.studentServe.getPassedOutStudentByRollNumber(this.rollNumber.value);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error?.message);
    } finally {
      this.loader.hide();
    }
  }

  async enableMembership(id: string): Promise<void> {
    try {
      if (this.year.value === null) {
        this.toast.info('Please Enter the no of years');
        return;
      }
      if (this.studentData.isMembershipActive) {
        this.toast.info('Membership is Already Avaliable');
        return;
      }
      this.loader.show();
      await this.studentServe.enableMembership(id, this.year.value);
      this.toast.success("Membership Renewed");
      this.router.navigate(['/passed-out']);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }
}
