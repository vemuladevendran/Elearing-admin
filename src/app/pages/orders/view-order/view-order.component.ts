import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  orderId = '';
  details: any;
  orderStatus: string = '';
  btnStatus = true;
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private orderServe: OrdersService,
    private route: ActivatedRoute,
  ) {
    this.orderId = this.route.snapshot.paramMap.get("id") ?? '';
  }


  async getOrderDetails(id: string): Promise<void> {
    try {
      this.loader.show();
      this.details = await this.orderServe.getOrderById(id);
      this.orderStatus = this.details.status;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  // updateOrderStatus
  async updateStatus(id: string): Promise<void> {
    try {
      this.loader.show();
      const status = {
        status: this.orderStatus,
      }
      await this.orderServe.updateOrderStatus(status, id);
      this.toast.info("Status Updated");
      this.btnStatus = true;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message)
    } finally {
      this.loader.hide();
    }
  }

  handleStatusChange(event: any) {
    this.btnStatus = false;
    this.orderStatus = event.value;
  }

  ngOnInit(): void {
    this.getOrderDetails(this.orderId);
  }



}
