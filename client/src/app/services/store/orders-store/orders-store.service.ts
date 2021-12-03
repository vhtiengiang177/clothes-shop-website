import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from '../../data/order/order.service';
import { Order } from '../../model/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersStoreService {
  private readonly _orders = new BehaviorSubject<Order[]>([]);

  readonly orders$ = this._orders.asObservable();

  constructor(private orderService: OrderService) {
   }

  get orders() : Order[] {
    return this._orders.value;
  }

  set orders(val: Order[]) {
    this._orders.next(val);
  }

  create(orderDetail, idAddress) {
    return this.orderService.createOrder(orderDetail, idAddress)
  }
}
