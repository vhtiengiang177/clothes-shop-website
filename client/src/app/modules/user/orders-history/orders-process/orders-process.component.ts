import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';


@Component({
  selector: 'app-orders-process',
  templateUrl: './orders-process.component.html',
  styleUrls: ['./orders-process.component.css']
})
export class OrdersProcessComponent implements OnInit {
  @Output('cancel-event') approvalEvent = new EventEmitter();

  constructor(private ordersProcessStore: OrdersProcessingStoreService, 
    public dialog: MatDialog,
    private toastr: ToastrService) {
    this.fetchData()  
  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersProcessStore.getAllOrdersByCustomerAndState(1);
  }

  cancelOrder(idOrder) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to cancel the order",
        id: idOrder
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.ordersProcessStore.updateState(idOrder, 6).subscribe(() => {
          this.toastr.success("Cancel order #" + idOrder + " successfully")
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.toastr.error("Not found order #" + idOrder)
          }
        })
      }
    });
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
