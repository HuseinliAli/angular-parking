import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStartModel } from '../models/orders/orderStart';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/common/response';
import { ListResponseModel } from '../models/common/listResponse';
import { OrderListModel } from '../models/orders/orderList';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'https://localhost:44345/Services/ParkingOrderService.asmx';

  constructor(private client: HttpClient) {}

  startOrder(order: OrderStartModel): Observable<ResponseModel> {
    return this.client.post<ResponseModel>(`${this.apiUrl}/StartOrder`, {
      request: order,
    });
  }
  endOrder(id: string) {
    return this.client.post<ResponseModel>(`${this.apiUrl}/EndOrder`, {
      request: id,
    });
  }
  history() {
    return this.client.post<ListResponseModel<OrderListModel>>(
      `${this.apiUrl}/History`,
      { request: this.getUserId() }
    );
  }

  getUserId(): string {
    return localStorage.getItem('p-user-id')!;
  }
}
