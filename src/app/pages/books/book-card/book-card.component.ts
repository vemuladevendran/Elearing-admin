import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookList: any[] = [];
  @Output() viewBook = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // Emit the book id to delete the book
  viewBookDetails(data: string) {
    this.viewBook.emit(data);
  }

}
