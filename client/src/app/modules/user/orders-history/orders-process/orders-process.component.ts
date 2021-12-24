import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, EventEmitter,Output } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-orders-process',
  templateUrl: './orders-process.component.html',
  styleUrls: ['./orders-process.component.css']
})
export class OrdersProcessComponent implements OnInit {

  constructor(private ordersProcessStore: OrdersProcessingStoreService, public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) {
    this.fetchData()  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersProcessStore.getAllOrderByState(1);
  }

}
