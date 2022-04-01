import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from './book-card/book-card.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
]
@NgModule({
  declarations: [
    BooksComponent,
    AddBookComponent,
    BookCardComponent,
    ViewBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class BooksModule { }
