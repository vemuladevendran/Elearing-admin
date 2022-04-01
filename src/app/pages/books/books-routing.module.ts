import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksComponent } from './books.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  },
  {
    path: 'edit-book/:id',
    component: AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
