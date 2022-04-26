import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookList: any[] = [];
  @Output() viewBook = new EventEmitter<string>();
  activeBookId = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(!this.route.snapshot.paramMap.get('view-id')){
      this.activeBookId = this.bookList[0]._id;
      return;
    }
    this.getActiveBookDetails();
  }

  getActiveBookDetails(): void {
    this.activeBookId = this.route.snapshot.paramMap.get('view-id') ?? '';
  }

  // Emit the book id to delete the book
  async viewBookDetails(data: any) {
    await this.router.navigate([`/books/${data._id}`]);
    this.getActiveBookDetails();
    this.viewBook.emit(data);
  }

}
