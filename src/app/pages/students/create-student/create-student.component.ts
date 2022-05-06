import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  role: string = '';
  createStudentForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private studentServe: StudentsService,
    private route: ActivatedRoute,
    private location: Location,
  ) {

    // checking role
    this.role = this.route.snapshot.paramMap.get('role') ?? '';
    if (this.role === '') {
      this.goBack();
    }
    // form initial
    this.createStudentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      role: [this.role, [Validators.required]],
      isVerified: [true],
      rollNumber: [],
      year: [1, [Validators.min(1), Validators.max(4)]],
    })
    this.checkRole();
  }


  // checking role
  checkRole(): void {
    const role = this.role;
    if (role !== 'student') {
      this.createStudentForm.patchValue({
        rollNumber: [null],
        year: null,
        role: 'member',
      });
    }
  }

  // goback function
  goBack(): void {
    this.location.back();
  }

  // create student
  async createStudent(): Promise<void> {
    try {
      this.loader.show();
      await this.studentServe.createStudent(this.createStudentForm.value);
      this.toast.success("Created");
      this.goBack();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
  }

}