import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersReturnStoreService } from 'src/app/services/store/orders-return-store/orders-return-store.service';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';

@Component({
  selector: 'app-orders-return',
  templateUrl: './orders-return.component.html',
  styleUrls: ['./orders-return.component.css']
})
export class OrdersReturnComponent implements OnInit {

  constructor(private ordersReturnStore: OrdersReturnStoreService,
    private dialog: MatDialog) { 
    this.fetchData()
  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersReturnStore.getAllOrdersByCustomerAndState(7);
  }

  viewDetailOrder(idOrder) {
    const dialogRef = this.dialog.open(OrderDetailUserFormComponent, {
      width: '1000px',
      data: { 
       idOrder: idOrder
      }
    });
  }
}
