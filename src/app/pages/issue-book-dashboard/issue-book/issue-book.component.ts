import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book/book.service';
import { IssueBookService } from 'src/app/services/issue-book/issue-book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.scss']
})
export class IssueBookComponent implements OnInit {
  rollNumber = new FormControl();
  bookCode = new FormControl();
  studentData: any;
  bookData: any;
  constructor(
    private studentServe: StudentsService,
    private bookServe: BookService,
    private bookIssueServe: IssueBookService,
    private loader: LoaderService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async getStudentDetails(): Promise<void> {
    try {
      if (this.rollNumber.value === null) {
        this.toast.info('Please Enter Roll Number');
        return;
      }
      this.loader.show();
      this.studentData = await this.studentServe.getStudentByRollNumber(this.rollNumber.value)
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  async getBookDetails(): Promise<void> {
    try {
      this.loader.show();
      this.bookData = await this.bookServe.getBookByCode(this.bookCode.value);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }

  async issueBook(): Promise<void> {
    try {
      this.loader.show();
      let data;
      if (this.studentData && this.bookData) {
        data = {
          studentId: this.studentData._id,
          bookId: this.bookData._id
        }
      }
      const result = await this.bookIssueServe.issueBook(data);
      this.toast.success('Book Issued Successfuly');
      this.router.navigate(['/issue-book-dashboard'])
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }

}
