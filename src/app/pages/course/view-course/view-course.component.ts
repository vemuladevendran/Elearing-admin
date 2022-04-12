import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  courseId = '';
  courseDetails: any;
  defaultThumbnailImg = '/assets/default-thumbnail-image.png';
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private courseServe: CourseService,
    private route: ActivatedRoute,
    breakpointObserver: BreakpointObserver
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      // .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'horizontal')));
  }

  ngOnInit(): void {
    this.getCourseDetails();
  }

  async getCourseDetails(): Promise<void> {
    try {
      this.loader.show();
      this.courseDetails = await this.courseServe.getCourseById(this.courseId);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }

}
