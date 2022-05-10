import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewOrderComponent } from './view-order/view-order.component';
const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    OrdersComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class OrdersModule { }
