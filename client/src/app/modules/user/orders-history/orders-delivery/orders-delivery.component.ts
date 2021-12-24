import { Component, OnInit } from '@angular/core';
import { OrdersDeliveryStoreService } from 'src/app/services/store/orders-Delivery-store/orders-Delivery-store.service';

@Component({
  selector: 'app-orders-delivery',
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.css']
})
export class OrdersDeliveryComponent implements OnInit {

  constructor(private ordersDeliveryStore: OrdersDeliveryStoreService) { }

  ngOnInit() {
  }

  fetchData() {
    this.ordersDeliveryStore.getAllOrdersByCustomerAndState(4);
  }
}
