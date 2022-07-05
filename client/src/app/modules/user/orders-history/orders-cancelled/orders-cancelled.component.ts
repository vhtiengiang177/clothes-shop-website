import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersCancelledStoreService } from 'src/app/services/store/orders-cancelled-store/orders-cancelled-store.service';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';

@Component({
  selector: 'app-orders-cancelled',
  templateUrl: './orders-cancelled.component.html',
  styleUrls: ['./orders-cancelled.component.css']
})
export class OrdersCancelledComponent implements OnInit {
  @Input() set cancelledListEvent(value: boolean) {
    this.fetchData()
  }
  
  constructor(private ordersCancelledStore: OrdersCancelledStoreService,
    private dialog: MatDialog) { 
    this.fetchData()
  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersCancelledStore.getAllOrdersByCustomerAndState(6);
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
