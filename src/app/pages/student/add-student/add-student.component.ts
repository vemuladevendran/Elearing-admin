import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  @ViewChild('profileUpload') fileInput: ElementRef<HTMLInputElement> | undefined;
  createStudentForm: FormGroup;
  defaultImageUrl = "/assets/default-profile.png"
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  formData = new FormData();
  studentId = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private studentServe: StudentService,
  ) {
    this.createStudentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      year: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      membership: [true, [Validators.required]],
      image: [null],
    });
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getEditFormValues();
  }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }
  // image select
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  // remove selected image
  removeSelectedImage(): void {
    this.selectedImagePreviewURL = '';
  }

  // get edit form values
  async getEditFormValues(): Promise<void> {
    try {
      if (this.studentId === '') {
        return;
      }
      this.loader.show();
      const data = await this.studentServe.getStudentById(this.studentId);
      if (data.image !== null && data.image !== undefined) {
        this.selectedImagePreviewURL = data?.image.url;
      }
      this.createStudentForm.patchValue(data);
    } catch (error) {
      console.log(error);
      this.toast.error('fail to get details')
    } finally {
      this.loader.hide();
    }
  }

  // create student
  async createStudent(): Promise<void> {
    try {
      // checking image file
      if (this.selectedFile !== undefined && this.selectedImagePreviewURL !== '') {
        this.updateFormData();
        this.loader.show();

        // checking update form or add form
        if (this.studentId !== '') {
          await this.studentServe.updateStudent(this.formData, this.studentId);
          this.toast.success('Updated');
          this.router.navigate(['/student'])
          return;
        }
        await this.studentServe.createStudent(this.formData);
        this.toast.success('Created');
        this.router.navigate(['/student'])
        return;
      };
      this.loader.show();

      // checking update form or add form
      if (this.studentId !== '') {
        if (this.selectedImagePreviewURL === '') {
          this.createStudentForm.value.image = null;
        }
        await this.studentServe.updateStudent(this.createStudentForm.value, this.studentId);
        this.toast.success('Updated');
        this.router.navigate(['/student'])
        return;
      }
      await this.studentServe.createStudent(this.createStudentForm.value);
      this.toast.success('Created');
      this.router.navigate(['/student'])
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  // update form data
  updateFormData(): void {
    const formValues = this.createStudentForm.value;
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
}
