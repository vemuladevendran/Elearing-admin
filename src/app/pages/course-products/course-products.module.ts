import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseProductsRoutingModule } from './course-products-routing.module';
import { AddCourseVideoComponent } from './add-course-video/add-course-video.component';
import { AddCourseMaterialComponent } from './add-course-material/add-course-material.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { VideoUploadFormComponent } from './add-course-video/video-upload-form/video-upload-form.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatStepperModule,
]

@NgModule({
  declarations: [
    AddCourseVideoComponent,
    AddCourseMaterialComponent,
    VideoUploadFormComponent
  ],
  imports: [
    CommonModule,
    CourseProductsRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class CourseProductsModule { }
