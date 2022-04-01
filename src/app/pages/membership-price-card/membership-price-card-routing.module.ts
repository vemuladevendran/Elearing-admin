import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembershipPriceComponent } from './add-membership-price/add-membership-price.component';
import { MembershipPriceCardComponent } from './membership-price-card.component';

const routes: Routes = [
  { path: '', component: MembershipPriceCardComponent },
  { path: 'membership-card', component: AddMembershipPriceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipPriceCardRoutingModule { }
