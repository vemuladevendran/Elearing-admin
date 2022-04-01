import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableMembershipComponent } from './enable-membership/enable-membership.component';
import { PassedOutComponent } from './passed-out.component';

const routes: Routes = [
  { path: '', component: PassedOutComponent },
  { path: 'enable-membership', component: EnableMembershipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassedOutRoutingModule { }
