import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { IssueBookService } from 'src/app/services/issue-book/issue-book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-due-books',
  templateUrl: './due-books.component.html',
  styleUrls: ['./due-books.component.scss']
})
export class DueBooksComponent implements OnInit {

  booksList: any[] = [];
  filtersForm: FormGroup;
  filters: any;

  constructor(
    private bookIssueServe: IssueBookService,
    private toast: ToastrService,
    private loader: LoaderService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      code: [''],
      rollNumber: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getBooks(this.filters);
      });
  }

  async getBooks(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.bookIssueServe.getDueBooks(filters);
      this.booksList = data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.messge)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getBooks(this.filters);
  }

}
