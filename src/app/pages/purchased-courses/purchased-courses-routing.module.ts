import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasedCoursesComponent } from './purchased-courses.component';

const routes: Routes = [{ path: '', component: PurchasedCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasedCoursesRoutingModule { }
