import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingCourseRequestRoutingModule } from './pending-course-request-routing.module';
import { PendingCourseRequestComponent } from './pending-course-request.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
const materialModules = [
  MatIconModule,
  MatCardModule,
]

@NgModule({
  declarations: [
    PendingCourseRequestComponent
  ],
  imports: [
    CommonModule,
    PendingCourseRequestRoutingModule,
    ...materialModules,
  ]
})
export class PendingCourseRequestModule { }
