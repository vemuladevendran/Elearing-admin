import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashBoardCount: any[] = [];
  orderDetails: any[] = []
  constructor(
    private dashboardServe: DashboardService,
    private loader: LoaderService,
    private toast: ToastrService,
    private orderServe: OrdersService,
  ) {

  }


  async getDashboardCount(): Promise<void> {
    try {
      this.loader.show();
      this.dashBoardCount = await this.dashboardServe.getDashboardCount();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  };

  async getOrderList(): Promise<void> {
    try {
      this.loader.show();
      while (true) {
        this.orderDetails = await this.orderServe.getOrders();
        await this.delay(500000);
      }
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  };

  delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    this.getDashboardCount();
    this.getOrderList();
  }

}
