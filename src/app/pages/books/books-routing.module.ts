import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { BooksComponent } from './books.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'add-book', component: AddBooksComponent },
  { path: 'edit/:id', component: AddBooksComponent },
  { path: ':view-id', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
