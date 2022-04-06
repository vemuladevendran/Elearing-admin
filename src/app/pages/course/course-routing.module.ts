import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course.component';
import { ViewCourseComponent } from './view-course/view-course.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'edit-course/:id', component: AddCourseComponent },
  { path: 'view-course/:id', component: ViewCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
