import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  defaultThumbnailImg = '/assets/default-thumbnail-image.png';
  courseList: any[] = [];
  filtersForm: FormGroup;
  filters: any;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private courseServe: CourseService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      code: [''],
      courseTitle: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getCourseDetails(this.filters);
      });
  }

  async getCourseDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.courseList = await this.courseServe.getCourses(filters);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }
  ngOnInit(): void {
    this.getCourseDetails(this.filters);
  }

}
