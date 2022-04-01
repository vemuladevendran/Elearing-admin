import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueBookDashboardRoutingModule } from './issue-book-dashboard-routing.module';
import { IssueBookDashboardComponent } from './issue-book-dashboard.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { ReturnedBooksComponent } from './returned-books/returned-books.component';
import { DueBooksComponent } from './due-books/due-books.component'; 

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatStepperModule
]

@NgModule({
  declarations: [
    IssueBookDashboardComponent,
    IssueBookComponent,
    IssuedBooksComponent,
    ReturnedBooksComponent,
    DueBooksComponent
  ],
  imports: [
    CommonModule,
    IssueBookDashboardRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class IssueBookDashboardModule { }
