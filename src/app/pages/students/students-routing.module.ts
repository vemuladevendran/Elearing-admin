import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentsComponent } from './students.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'create-student/:role', component: CreateStudentComponent },
  { path: 'update-student/:role/:id', component: CreateStudentComponent },
  { path: 'view-student/:role/:id', component: ViewStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
