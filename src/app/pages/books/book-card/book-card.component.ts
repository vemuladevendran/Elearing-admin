import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewBookComponent } from '../view-book/view-book.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookList: any[] = [];
  @Output() deleteBookId = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // edit book details
  editBookDetails(id: string): void {
    this.router.navigate([`books/edit-book/${id}`])
  }

  // opening view dialog
  openDialog(e: any, data: any) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(ViewBookComponent, {
      width: '530px',
      height: '390px',
      panelClass: 'zero-padding-panel',
      data: {
        data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Emit the book id to delete the book
  deleteBook(id: string, event: any) {
    event.stopPropagation();
    this.deleteBookId.emit(id);
  }

}
