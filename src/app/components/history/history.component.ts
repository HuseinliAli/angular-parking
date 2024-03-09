import { Component, OnInit } from '@angular/core';
import { OrderListModel } from '../../models/orders/orderList';
import { OrderService } from '../../services/order.service';
import { ApiResponseModel } from '../../models/common/apiResponse';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  orders: OrderListModel[];
  endOrderResponse: ApiResponseModel;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrdersByUserId();
  }
  endOrder(id: string) {
    this.orderService.endOrder(id).subscribe((data) => {
      this.endOrderResponse = JSON.parse(data.d.toString());
      this.getOrdersByUserId();
    });

    console.log(id);
  }
  getOrdersByUserId() {
    this.orderService
      .history()
      .subscribe((data) => (this.orders = JSON.parse(data.d.toString())));
  }
}
