import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { IssueBookService } from 'src/app/services/issue-book/issue-book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.scss']
})
export class IssuedBooksComponent implements OnInit {
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
      const data = await this.bookIssueServe.getIssuedBooks(filters);
      this.booksList = data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.messge)
    } finally {
      this.loader.hide();
    }
  }

  async returnBook(data: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to return this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!',
    });
    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.bookIssueServe.returnBook(data.bookId._id, data._id)
        this.toast.success('Returned')
        location.reload();
        this.getBooks(this.filters);
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error.message)
      } finally {
        this.loader.hide();
      }
    }

  }

  async renewal(data: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to Renewal this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.bookIssueServe.renewalBook(data.bookId._id, data._id);
        this.toast.success('Renewed');
        this.getBooks(this.filters);
      } catch (error: any) {
        console.log(error);
        this.toast.error(error?.error.message)
      } finally {
        this.loader.hide();
      }
    }

  }

  ngOnInit(): void {
    this.getBooks(this.filters);
  }

}
