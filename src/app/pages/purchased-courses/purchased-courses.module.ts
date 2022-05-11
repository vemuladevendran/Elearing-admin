import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasedCoursesRoutingModule } from './purchased-courses-routing.module';
import { PurchasedCoursesComponent } from './purchased-courses.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    PurchasedCoursesComponent
  ],
  imports: [
    CommonModule,
    PurchasedCoursesRoutingModule,
    materialModules,
  ]
})
export class PurchasedCoursesModule { }
