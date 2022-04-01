import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueBookDashboardComponent } from './issue-book-dashboard.component';
import { IssueBookComponent } from './issue-book/issue-book.component';

const routes: Routes = [
  { path: '', component: IssueBookDashboardComponent },
  { path: 'issue-book', component: IssueBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueBookDashboardRoutingModule { }
