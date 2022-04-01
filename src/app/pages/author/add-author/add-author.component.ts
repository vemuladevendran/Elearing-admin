import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/services/author/author.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {
  authorForm: FormGroup;
  authorId = '';
  constructor(
    private fb: FormBuilder,
    private authorServe: AuthorService,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authorForm = this.fb.group({
      authorName: ['', [Validators.required]],
      authorEmail: [''],
    });
    this.authorId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getEditFormValues();
  }


  // get edit form values
  async getEditFormValues(): Promise<void> {
    try {
      if (this.authorId === '') {
        return;
      }
      this.loader.show();
      const data = await this.authorServe.getAuthorById(this.authorId);
      this.authorForm.patchValue(data);
    } catch (error) {
      console.log(error);
      this.toast.error('fail to get details')
    } finally {
      this.loader.hide();
    }
  }

  // create author
  async createAuthor(): Promise<void> {
    try {
      this.loader.show();
      console.log(this.authorForm.value);
      if (this.authorId !== '') {
        await this.authorServe.updateAuthor(this.authorForm.value, this.authorId);
        this.toast.success('Successfully Updated');
        this.router.navigate(['/authors']);
        return;
      }
      const result = await this.authorServe.createAuthor(this.authorForm.value);
      this.toast.success('Successfully Created');
      this.router.navigate(['/authors']);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.message)
    } finally {
      this.loader.hide();
    }
  }

}
