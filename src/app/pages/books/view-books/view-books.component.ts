import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit, OnChanges {
  @Output() closeViewBook = new EventEmitter<boolean>();
  @Input() bookDetails: any;
  showLoader = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 800);
  }

  async shareData(): Promise<void> {
    try {
      const shareData = {
        url: window.location.href,
        title: 'Course Details',
        text: "hi",
      };
      navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  }

  closeViewBookScreen(): void {
    this.closeViewBook.emit(false);
    this.showLoader = false;
  }

}
