import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingCourseRequestComponent } from './pending-course-request.component';

const routes: Routes = [{ path: '', component: PendingCourseRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingCourseRequestRoutingModule { }
