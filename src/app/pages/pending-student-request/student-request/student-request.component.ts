import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-student-request',
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.scss']
})
export class StudentRequestComponent implements OnInit {
  students: any[] = [];
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private studentServe: StudentsService
  ) { }


  async getPendingRequest(): Promise<void> {
    try {
      this.loader.show();
      this.students = await this.studentServe.getPendingRequest({ role: 'student' });
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getPendingRequest();
  }

}
