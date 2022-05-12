import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueComponent } from './issue.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';

const routes: Routes = [
  { path: '', component: IssueComponent },
  { path: ':id', component: ViewIssueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
