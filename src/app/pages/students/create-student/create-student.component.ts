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
  createStudentForm: FormGroup;
  studentId = '';
  studentDetails: any;
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
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
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
      if (this.studentId !== "") {
        await this.studentServe.updateStudent(this.studentId, this.createStudentForm.value);
        this.toast.success("Updated");
        this.goBack();
        return;
      }
      await this.studentServe.createStudent(this.createStudentForm.value);
      this.toast.success("Created");
      this.goBack();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  };

  async getStudentDetails(): Promise<void> {
    if (this.studentId === '') {
      return;
    }
    try {
      this.loader.show();
      const data = await this.studentServe.getStudentById(this.studentId);
      this.studentDetails = data?.student;
      this.createStudentForm.patchValue(this.studentDetails);
      console.log(data, 'student details');
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

}
