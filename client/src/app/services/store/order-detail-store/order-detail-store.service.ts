import { OrderDetail } from './../../model/order/order-detail.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../data/product/product.service';
import { ProductSizeColor } from '../../model/product/product-size-color.model';
import { OrderService } from '../../data/order/order.service';
import { Order } from '../../model/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailStoreService {

  private readonly _orderdetails = new BehaviorSubject<OrderDetail[]>([]);

  readonly orderdetails$ = this._orderdetails.asObservable();

  private readonly _orders = new BehaviorSubject<Order[]>([]);

  readonly orders$ = this._orders.asObservable();

  constructor(private orderService: OrderService, private toastr: ToastrService) {
   }

  get orderdetails() : OrderDetail[] {
    return this._orderdetails.value;
  }

  set orderdetails(val: OrderDetail[]) {
    this._orderdetails.next(val);
  }

  get orders() : Order[] {
    return this._orders.value;
  }

  set orders(val: Order[]) {
    this._orders.next(val);
  }

  get(id){
    this.orderService.getAllOrderDetailByOrder(id)
            .subscribe(res => this.orderdetails = res.data);
  }

  getAllOrders(){
    this.orderService.getAllOrders()
            .subscribe(res => this.orders = res.data);
  }

  
}
