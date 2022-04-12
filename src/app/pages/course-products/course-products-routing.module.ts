import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseMaterialComponent } from './add-course-material/add-course-material.component';
import { AddCourseVideoComponent } from './add-course-video/add-course-video.component';

const routes: Routes = [
  {
    path: ':id/:course/add-video',
    component: AddCourseVideoComponent
  },
  {
    path: ':id/:course/add-material',
    component: AddCourseMaterialComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseProductsRoutingModule { }
