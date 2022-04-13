import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/services/author/author.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  bookList: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  authors: any[] = [];
  booksCategory: any[] = [];
  filtersForm: FormGroup;
  filters: any;
  viewBookScreen = false;
  constructor(
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

  async viewBookDetails(event: any) {
    try {
      this.viewBookScreen = true;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.authorList()
  }

}
