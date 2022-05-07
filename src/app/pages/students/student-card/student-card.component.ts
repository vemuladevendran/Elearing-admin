import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  studentList: any[] = [];
  filtersForm: FormGroup;
  filters: any = {
    role: 'student'
  };
  view = 'card'
  constructor(
    private toast: ToastrService,
    private loader: LoaderService,
    private studentServe: StudentsService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.filtersForm = this.fb.group({
      name: [''],
      rollNumber: [''],
      role: 'student'
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getStudents(this.filters);
      });
  }

  ngOnInit(): void {
    this.getStudents(this.filters)
  }


  viewChange(event: any) {
    this.view = event.target.value
  }

  // get student list

  async getStudents(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.studentList = await this.studentServe.getStudents(filters);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  // delete student
  async deleteStudent(id: string, event: any): Promise<void> {
    event.stopPropagation();
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
        await this.studentServe.deleteStudent(id);
        this.toast.success('Deleted');
        this.getStudents(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      }
    }
  };

  updateStudent(id: string, event: any) {
    event.stopPropagation();
    this.router.navigate(['/students/update-student/student/', id])
  }

}
