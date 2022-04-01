import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promote-students',
  templateUrl: './promote-students.component.html',
  styleUrls: ['./promote-students.component.scss']
})
export class PromoteStudentsComponent implements OnInit {
  selectedYear = new FormControl();
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private studentServe: StudentService,
    private router: Router,
  ) { }


  async promoteStudents(): Promise<void> {
    if (!this.selectedYear.value) {
      this.toast.info("Please select the year");
      return;
    }
    const result = await Swal.fire({
      title: 'Are you sure you want to update?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update !',
    });

    if (result.isConfirmed) {
      try {
        this.loader.show();
        const result = await this.studentServe.promoteStudents(this.selectedYear.value);
        this.toast.success('updated');
        this.router.navigate(['/student'])
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error.meaasge)
      } finally {
        this.loader.hide();
      }
    }
  }

  infoMessage(): void {
    const result = Swal.fire({
      title: 'Disclaimer',
      text: "Before updating please read the disclaimer",
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
  }

  ngOnInit(): void {
    this.infoMessage();
  }

}
