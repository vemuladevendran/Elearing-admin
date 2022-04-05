import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course/course.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @ViewChild('courseImage') fileInput: ElementRef<HTMLInputElement> | undefined;
  addCourseForm: FormGroup;
  courseId = '';
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  formData = new FormData();
  durationMonths = Array(12).fill('');
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private courseServe: CourseService
  ) {
    this.addCourseForm = this.fb.group({
      courseTitle: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      courseDuration: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: [null],
    })
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // open file input
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  async createCourse(): Promise<void> {
    try {
      // checking image file
      if (this.selectedFile !== undefined) {
        this.updateFormData();
        this.loader.show();

        // checking update form or add form
        if (this.courseId !== '') {
          await this.courseServe.updateCourse(this.courseId, this.formData);
          this.toast.success('Updated');
          this.router.navigate(['/course']);
          return;
        }
        await this.courseServe.createCourse(this.formData);
        this.toast.success('Created');
        this.router.navigate(['/course']);
        return;
      };
      this.loader.show();

      // checking update form or add form
      if (this.courseId !== '') {
        if (this.selectedImagePreviewURL === '') {
          this.addCourseForm.value.image = null;
        }
        await this.courseServe.updateCourse(this.courseId, this.addCourseForm.value);
        this.toast.success('Updated');
        this.router.navigate(['/course']);
        return;
      }
      await this.courseServe.createCourse(this.addCourseForm.value);
      this.toast.success('Created');
      this.router.navigate(['/course']);
      return;
    } catch (error: any) {
      this.toast.error(error?.error?.message);
      console.log(error);
    } finally {
      this.loader.hide();
    }
  }

  // update form data
  updateFormData(): void {
    const formValues = this.addCourseForm.value;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    this.formData.append('image', this.selectedFile);
  }

  // get edit form values
  async getEditFormValues(): Promise<void> {
    try {
      if (this.courseId === '') {
        return;
      }
      this.loader.show();
      const data = await this.courseServe.getCourseById(this.courseId);
      if (data.image !== null && data.image !== undefined) {
        this.selectedImagePreviewURL = data?.image.url;
      }
      this.addCourseForm.patchValue(data);
    } catch (error) {
      console.log(error);
      this.toast.error('fail to get details');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getEditFormValues();
  }

}
