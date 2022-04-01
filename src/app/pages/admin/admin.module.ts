import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
]
@NgModule({
  declarations: [
    AdminComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AdminModule { }
