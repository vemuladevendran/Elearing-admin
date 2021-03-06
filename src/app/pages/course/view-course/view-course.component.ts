import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Meta } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { VideoService } from 'src/app/services/video/video.service';

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
    private meta: Meta,
    private videoServe: VideoService,
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


  async shareData(): Promise<void> {
    try {
      this.meta.updateTag({ property: "og:image", content: this.courseDetails?.image?.url });
      const shareData = {
        url: window.location.href,
        title: 'Course Details',
        text: `
        Title: ${this.courseDetails.courseTitle}
        Description: ${this.courseDetails.description}
        Price: ${this.courseDetails.price}
        The course contains ${this.courseDetails.count[0]} Videos, ${this.courseDetails.count[1]} Materials
        `,
      };
      navigator.share(shareData);
    } catch (error) {
      console.log(error);
      this.toast.error("fail to share")
    }
  }

  async deleteVideo(id: string): Promise<void> {
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
        await this.videoServe.deleteVideo(id);
        this.toast.success("Deleted");
        this.getCourseDetails();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      } finally {
        this.loader.hide();
      }
    }
  };

}
