import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  viewBookScreen = false;
  viewBookdetails: any;
  constructor(
    private authorServe: AuthorService,
    private toast: ToastrService,
    private loader: LoaderService,
    private fb: FormBuilder,
    private bookServe: BookService,
  ) {
    this.filtersForm = this.fb.group({
      author: [''],
      category: [''],
      title: [''],
      accessCode: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getBookDetails(this.filters);
      });
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

  async viewBookDetails(data: any) {
    try {
      this.viewBookdetails = data;
      this.viewBookScreen = true;
    } catch (error) {
      console.log(error);
    }
  }

  // get book details
  async getBookDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.bookList = await this.bookServe.getBooks(filters);
      this.viewBookdetails = this.bookList[0];
      this.authorList();
    } catch (error: any) {
      this.toast.error(error.error?.message);
      console.log(error);
    } finally {
      this.loader.hide();
    }
  }

  // delete book details
  async deleteBook(id: string): Promise<void> {
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
        await this.bookServe.deleteBook(id);
        this.toast.success("Deleted");
        this.getBookDetails(this.filters);
      } catch (error: any) {
        console.log(error);
        this.toast.error(error.error?.messge);
      }
      finally {
        this.loader.hide();
      }
    }
  }

  ngOnInit(): void {
    this.getBookDetails(this.filters);
  }

}
