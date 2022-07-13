import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersDeliveryStoreService } from 'src/app/services/store/orders-delivery-store/orders-delivery-store.service';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';

@Component({
  selector: 'app-orders-delivery',
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.css']
})
export class OrdersDeliveryComponent implements OnInit {

  constructor(private ordersDeliveryStore: OrdersDeliveryStoreService,
    private dialog: MatDialog) { 
    this.fetchData()
  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersDeliveryStore.getAllOrdersByCustomerAndState(4);
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
