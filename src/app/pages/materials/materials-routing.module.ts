import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaterialsComponent } from './add-materials/add-materials.component';
import { MaterialsComponent } from './materials.component';

const routes: Routes = [
  { path: '', component: MaterialsComponent },
  { path: 'add-material', component: AddMaterialsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRoutingModule { }
