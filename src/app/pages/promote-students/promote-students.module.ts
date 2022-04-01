import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoteStudentsRoutingModule } from './promote-students-routing.module';
import { PromoteStudentsComponent } from './promote-students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
];


@NgModule({
  declarations: [
    PromoteStudentsComponent
  ],
  imports: [
    CommonModule,
    PromoteStudentsRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class PromoteStudentsModule { }
