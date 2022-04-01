import { AddStudentComponent } from './add-student/add-student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: AddStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }
