import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course/course.service';
import { EnroleCourseService } from 'src/app/services/enrole-course/enrole-course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-purchased-courses',
  templateUrl: './purchased-courses.component.html',
  styleUrls: ['./purchased-courses.component.scss']
})
export class PurchasedCoursesComponent implements OnInit {
  courseDetails: any[] = [];
  totalCount = 0;
  page = 1;
  defaultThumbnailImg = '/assets/default-thumbnail-image.png';
  filters = {}
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private enroleCourseServe: EnroleCourseService
  ) { }

  async getCourseDetails(filters: any, page: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.enroleCourseServe.getEnroleCourses(filters, page);
      this.courseDetails = data.data;
      this.totalCount = data.count;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }

  // handle page
  handlePage(event: any): void {
    this.page = event.pageIndex + 1;
    this.getCourseDetails(this.filters, this.page);
  }
  ngOnInit(): void {
    this.getCourseDetails(this.filters, this.page);
  }

}
