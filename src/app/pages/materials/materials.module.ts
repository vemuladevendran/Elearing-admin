import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials.component';
import { AddMaterialsComponent } from './add-materials/add-materials.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewMaterialComponent } from './view-material/view-material.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule
]
@NgModule({
  declarations: [
    MaterialsComponent,
    AddMaterialsComponent,
    ViewMaterialComponent,
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    ...materialModules,
  ]
})
export class MaterialsModule { }
