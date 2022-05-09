import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderDetails: any[] = [];
  filters: any = {};
  totalCount = 0;
  page = 1;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private orderServe: OrdersService
  ) { }


  async getOrderList(filters: any, page: any): Promise<void> {
    try {
      this.loader.show();
      while (true) {
        this.loader.show();
        const data = await this.orderServe.getOrders(filters, page);
        this.orderDetails = data.data;
        this.totalCount = data.count;
        this.loader.hide();
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

  handleStatusChange(event: any) {
    const value = event.value;
    this.filters = {
      status: value
    };
    this.getOrderList(this.filters, this.page);
  }

  // handle page
  handlePage(event: any): void {
    this.page = event.pageIndex + 1;
    this.getOrderList(this.filters, this.page);
  }

  ngOnInit(): void {
    this.getOrderList(this.filters, this.page);
  }

}
