import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductsComponent } from './products/products.component';
import { SettingComponent } from './setting/setting.component';
import { LayoutModule } from './layout/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  bootstrap: []
})
export class AdminModule { }
