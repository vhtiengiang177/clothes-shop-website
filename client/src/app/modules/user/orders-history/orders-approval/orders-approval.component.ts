import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { OrdersApprovalStoreService } from 'src/app/services/store/orders-approval-store/orders-approval-store.service';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';

@Component({
  selector: 'app-orders-approval',
  templateUrl: './orders-approval.component.html',
  styleUrls: ['./orders-approval.component.css']
})
export class OrdersApprovalComponent implements OnInit {

  constructor(private ordersApprovalStore: OrdersApprovalStoreService, 
    public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) {
    this.fetchData()  
  }

  ngOnInit() {
  }

  fetchData() {
    // get state 2 and 3
    this.ordersApprovalStore.getAllOrdersByCustomerAndState();
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
