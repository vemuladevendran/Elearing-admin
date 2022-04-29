import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingStudentRequestComponent } from './pending-student-request.component';

const routes: Routes = [{ path: '', component: PendingStudentRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingStudentRequestRoutingModule { }
