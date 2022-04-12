import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorComponent } from './author.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorComponent
  },
  {
    path: 'add-author',
    component: AddAuthorComponent,
  },
  {
    path: 'edit-author/:id',
    component: AddAuthorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
