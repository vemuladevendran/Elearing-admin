import { StudentService } from '../../services/student/student.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  studentsList: any[] = [];
  filtersForm: FormGroup;
  filters: any;

  constructor(
    private studentServe: StudentService,
    private loader: LoaderService,
    private toast: ToastrService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      year: [''],
      rollNumber: [''],
      name: ['']
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getStudentDetails(this.filters);
      });
  }

  ngOnInit(): void {
    this.getStudentDetails(this.filters);
  }

  // get students List
  async getStudentDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.studentsList = await this.studentServe.getStudents(filters);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to Load')
    } finally {
      this.loader.hide();
    }
  }

  // delete student
  async deleteStudent(e: any): Promise<void> {
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
        await this.studentServe.deleteStudent(e);
        this.getStudentDetails(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
      } finally {
        this.loader.hide();
      }
    }
  }

}
