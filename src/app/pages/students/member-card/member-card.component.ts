import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  studentList: any[] = [];
  filtersForm: FormGroup;
  filters: any = {
    role: 'member'
  };
  constructor(
    private toast: ToastrService,
    private loader: LoaderService,
    private studentServe: StudentsService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      name: [''],
      role: 'member'
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
    try {

    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

}
