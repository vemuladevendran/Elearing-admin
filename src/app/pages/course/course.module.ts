import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCourseComponent } from './view-course/view-course.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { MaterialCardComponent } from './material-card/material-card.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatStepperModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    ViewCourseComponent,
    VideoCardComponent,
    MaterialCardComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class CourseModule { }
