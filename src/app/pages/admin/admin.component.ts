import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminList: any[] = [];
  myId: string = '';
  constructor(
    private adminServe: AdminService,
    private loader: LoaderService,
    private toast: ToastrService,
    private token: TokenService
  ) { }

  // get admin list

  async getAdminsList(): Promise<void> {
    try {
      this.loader.show();
      this.adminList = await this.adminServe.getAdmins();
      this.getMyDetails();
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to load");
    } finally {
      this.loader.hide();
    }
  }

  async getMyDetails(): Promise<void> {
    try {
      const data = await this.token.getUserName();
      this.myId = data._id
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to load");
    }
  }

  // delete admin
  async deleteBook(id: any): Promise<void> {
    if (id === this.myId) {
      this.toast.error('Your are trying to delete your Id');
      return;
    }
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
        await this.adminServe.deleteAdmin(id);
        this.toast.info('Deleted');
        this.getAdminsList();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      }
    }
  }

  ngOnInit(): void {
    this.getAdminsList();
  }

}
