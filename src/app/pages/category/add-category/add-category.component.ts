import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  createCategoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private categoryServe: CategoryService,
    private router: Router
  ) {
    this.createCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
    })
  }

  // create admin 
  async createCategory(): Promise<void> {
    try {
      this.loader.show();
      const result = await this.categoryServe.createCategory(this.createCategoryForm.value);
      this.toast.success('Created');
      this.router.navigate(['/category'])
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
