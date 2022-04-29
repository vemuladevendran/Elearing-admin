import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingStudentRequestRoutingModule } from './pending-student-request-routing.module';
import { PendingStudentRequestComponent } from './pending-student-request.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StudentRequestComponent } from './student-request/student-request.component';
import { MemberRequestComponent } from './member-request/member-request.component';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
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
    PendingStudentRequestComponent,
    StudentRequestComponent,
    MemberRequestComponent
  ],
  imports: [
    CommonModule,
    PendingStudentRequestRoutingModule,
    ...materialModules,
  ]
})
export class PendingStudentRequestModule { }
