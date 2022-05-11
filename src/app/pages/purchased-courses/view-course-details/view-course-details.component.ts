import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnroleCourseService } from 'src/app/services/enrole-course/enrole-course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-course-details',
  templateUrl: './view-course-details.component.html',
  styleUrls: ['./view-course-details.component.scss']
})
export class ViewCourseDetailsComponent implements OnInit {
  courseDetails: any;
  studentsDetails: any[] = [];
  defaultThumbnailImg = '/assets/default-profile.png';
  courseId = '';
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private enroleCourseServe: EnroleCourseService,
    private route: ActivatedRoute,
  ) {
    this.courseId = this.route.snapshot.paramMap.get("id") ?? '';
  }

  async getEnroledStudentDetails(id: string): Promise<void> {
    try {
      this.loader.show();
      const data = await this.enroleCourseServe.getStudentsByCourseID(id);
      this.courseDetails = data[0].course;
      this.studentsDetails = data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  

  ngOnInit(): void {
    this.getEnroledStudentDetails(this.courseId);
  }

}
