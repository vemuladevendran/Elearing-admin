import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  studentID = '';
  role = '';
  studentDetails: any
  constructor(
    private studentServe: StudentsService,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // checking role
    this.role = this.route.snapshot.paramMap.get('role') ?? '';
    this.studentID = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.role === "" || this.studentID == "") {
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }


  async getStudentDetails(): Promise<void> {
    try {
      this.loader.show();
      this.studentDetails = await this.studentServe.getStudentById(this.studentID);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

}
