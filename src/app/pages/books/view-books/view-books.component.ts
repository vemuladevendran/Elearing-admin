import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {
  @Output() closeViewBook = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeViewBookScreen(): void {
    this.closeViewBook.emit(false);
  }

}
