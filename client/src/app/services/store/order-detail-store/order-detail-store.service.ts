import { OrderDetail } from './../../model/order/order-detail.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../data/product/product.service';
import { ProductSizeColor } from '../../model/product/product-size-color.model';
import { OrderService } from '../../data/order/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailStoreService {

  private readonly _orderdetails = new BehaviorSubject<OrderDetail[]>([]);

  readonly orderdetails$ = this._orderdetails.asObservable();

  constructor(private orderService: OrderService, private toastr: ToastrService) {
   }

  get orderdetails() : OrderDetail[] {
    return this._orderdetails.value;
  }

  set orderdetails(val: OrderDetail[]) {
    this._orderdetails.next(val);
  }

  get(id){
    this.orderService.GetAllOrderDetailByOrder(id)
            .subscribe(res => this.orderdetails = res.data);
  }

  
}
