import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPriceCardRoutingModule } from './membership-price-card-routing.module';
import { MembershipPriceCardComponent } from './membership-price-card.component';
import { AddMembershipPriceComponent } from './add-membership-price/add-membership-price.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
]

@NgModule({
  declarations: [
    MembershipPriceCardComponent,
    AddMembershipPriceComponent
  ],
  imports: [
    CommonModule,
    MembershipPriceCardRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class MembershipPriceCardModule { }
