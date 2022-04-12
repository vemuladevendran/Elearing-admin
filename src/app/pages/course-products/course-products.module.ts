import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseProductsRoutingModule } from './course-products-routing.module';
import { AddCourseVideoComponent } from './add-course-video/add-course-video.component';
import { AddCourseMaterialComponent } from './add-course-material/add-course-material.component';


@NgModule({
  declarations: [
    AddCourseVideoComponent,
    AddCourseMaterialComponent
  ],
  imports: [
    CommonModule,
    CourseProductsRoutingModule
  ]
})
export class CourseProductsModule { }
