import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassedOutRoutingModule } from './passed-out-routing.module';
import { PassedOutComponent } from './passed-out.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonComponentModule } from 'src/app/components/common-components/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnableMembershipComponent } from './enable-membership/enable-membership.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    PassedOutComponent,
    EnableMembershipComponent,
  ],
  imports: [
    CommonModule,
    PassedOutRoutingModule,
    CommonComponentModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class PassedOutModule { }
