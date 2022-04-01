import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  bookList: any[] = [];
  authors: any[] = [];
  booksCategory: any[] = [];
  filtersForm: FormGroup;
  filters: any;
  constructor(
    private bookServe: BookService,
    private authorServe: AuthorService,
    private toast: ToastrService,
    private loader: LoaderService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      author: [''],
      category: [''],
      title: [''],
      code: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getBookList(this.filters);
      });
  }

  ngOnInit(): void {
    this.getBookList(this.filters);
  }


  // get author list
  async authorList(): Promise<void> {
    try {
      this.authors = await this.authorServe.getAuthors();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch authors')
    }
  }

  // get books category
  async getBooksCategory(): Promise<void> {
    try {
      this.booksCategory = await this.bookServe.getBooksCategory();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch Books Category')
    }
  }

  // book list
  async getBookList(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.bookList = await this.bookServe.getBooks(filters);
      this.authorList();
      this.getBooksCategory();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.message)
    } finally {
      this.loader.hide();
    }
  }

  // delete book
  async deleteBook(e: any): Promise<void> {
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
        await this.bookServe.deleteBook(e);
        this.toast.info('Deleted');
        this.getBookList(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      }
    }
  }

}
