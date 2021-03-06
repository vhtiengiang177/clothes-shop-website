import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { Order } from '../../model/order/order.model';
import { OrderService } from '../../data/order/order.service';
import { FilterParamsOrders } from '../../model/order/filter-params-orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersApprovalStoreService {

  private readonly _orders = new BehaviorSubject<Order[]>([]);

  readonly orders$ = this._orders.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);

  constructor(private orderService: OrderService, private toastr: ToastrService) {
    if (this.orders.length == 0) {
      let filter: FilterParamsOrders = {
        idState: 2
      };
      this.getAll(filter);
    }
   }

   get orders() : Order[] {
    return this._orders.value;
  }

  set orders(val: Order[]) {
    this._orders.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getAll(filterParams: FilterParamsOrders) {
    await this.orderService.get(filterParams)
      .subscribe(res => {
        this.orders = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  async getAllOrderByState(state) {
    await this.orderService.getAllOrderByState(state)
      .subscribe(res => {
        this.orders = res.data;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  async getAllOrdersByCustomerAndState() {
    var listOrder: Order[] = []
    await this.orderService.getAllOrdersByCustomerAndState(2)
      .subscribe(res => {
        res.data.forEach(item => {
          listOrder.push(item)
        })
        this.orderService.getAllOrdersByCustomerAndState(3).subscribe(res => {
          res.data.forEach(item => {
            listOrder.push(item)
          })
          
          this.orders = listOrder
          console.log(this.orders);
          
        })
      })
  }

  updateState(id,state) {
    return this.orderService.updateState(id,state)
  }


}
