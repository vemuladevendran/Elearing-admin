import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: ViewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
