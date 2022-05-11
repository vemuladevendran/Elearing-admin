import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasedCoursesComponent } from './purchased-courses.component';
import { ViewCourseDetailsComponent } from './view-course-details/view-course-details.component';

const routes: Routes = [
  { path: '', component: PurchasedCoursesComponent },
  { path: ':id', component: ViewCourseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasedCoursesRoutingModule { }
