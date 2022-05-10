import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryList: any[] = [];

  constructor(
    private categoryServe: CategoryService,
    private loader: LoaderService,
    private toast: ToastrService,
    private token: TokenService
  ) { }


  async getCategoryList(): Promise<void> {
    try {
      this.loader.show();
      this.categoryList = await this.categoryServe.getCategory();
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to load");
    } finally {
      this.loader.hide();
    }
  }


  async deleteategory(id: any): Promise<void> {
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
        await this.categoryServe.deleteCategory(id);
        this.toast.info('Deleted');
        this.getCategoryList();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      }
    }
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

}
