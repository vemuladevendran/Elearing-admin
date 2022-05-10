import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  totalCount = 0;
  page = 1;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private courseServe: CourseService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.filtersForm = this.fb.group({
      code: [''],
      courseTitle: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getCourseDetails(this.filters, this.page);
      });
  }

  async getCourseDetails(filters: any, page: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.courseServe.getCourses(filters, page);
      this.courseList = data.courses;
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

  // view course details
  viewCourse(id: string): void {
    this.router.navigate(['/course/view-course/', id])
  };

  // edit course details
  editCourse(event: any, id: string): void {
    event.stopPropagation();
    this.router.navigate(['/course/edit-course/', id])
  }
  ngOnInit(): void {
    this.getCourseDetails(this.filters, this.page);
  }

}
