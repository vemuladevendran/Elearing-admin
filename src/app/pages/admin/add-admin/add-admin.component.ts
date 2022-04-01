import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  createAdminForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private adminServe: AdminService,
    private router: Router
  ) {
    this.createAdminForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  // create admin 
  async createAdmin(): Promise<void> {
    try {
      this.loader.show();
      const result = await this.adminServe.createAdmin(this.createAdminForm.value);
      this.toast.success('Created');
      this.toast.info('Password Send to registerd mail id')
      this.router.navigate(['/admin'])
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
