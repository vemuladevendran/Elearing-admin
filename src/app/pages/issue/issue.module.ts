import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewIssueComponent } from './view-issue/view-issue.component';


@NgModule({
  declarations: [
    IssueComponent,
    ViewIssueComponent
  ],
  imports: [
    CommonModule,
    IssueRoutingModule,
    MatIconModule
  ]
})
export class IssueModule { }
