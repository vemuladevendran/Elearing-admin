import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IssueBookService } from 'src/app/services/issue-book/issue-book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss']
})
export class ReturnedBooksComponent implements OnInit {

  booksList: any[] = [];

  constructor(
    private bookIssueServe: IssueBookService,
    private toast: ToastrService,
    private loader: LoaderService,
    private fb: FormBuilder,
  ) {
  }

  async getBooks(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.bookIssueServe.getReturnBooks();
      this.booksList = data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.messge)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getBooks();
  }

}
