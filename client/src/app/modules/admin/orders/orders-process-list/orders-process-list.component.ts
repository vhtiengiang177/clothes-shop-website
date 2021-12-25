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
import { OrdersDetailFormComponent } from '../orders-detail-form/orders-detail-form/orders-detail-form.component';

@Component({
  selector: 'app-orders-process-list',
  templateUrl: './orders-process-list.component.html',
  styleUrls: ['./orders-process-list.component.css']
})
export class OrdersProcessListComponent implements OnInit {
  @Output('approval-event') approvalEvent = new EventEmitter();
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState:1,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersProcessStore: OrdersProcessingStoreService, public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) { 

      this.fetchData()
    }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.ordersProcessStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 1,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  searchEvent(content) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      idState: 1,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDateOrders() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'dateorder:asc') {
        this.filter.sort = 'dateorder:asc';
      }
      else {
        this.filter.sort = 'dateorder:desc';
      }
      this.fetchData()
    }
  }

   sortIdShipper() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'idshipper:asc') {
        this.filter.sort = 'idshipper:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortIdEmployee() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'idemployee:asc') {
        this.filter.sort = 'idemployee:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDatePayment() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'datepayment:asc') {
        this.filter.sort = 'datepayment:asc';
      }
      else {
        this.filter.sort = 'datepayment:desc';
      }
      this.fetchData()
    }
  }

  sortDateShip() {
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'dateship:asc') {
        this.filter.sort = 'dateship:asc';
      }
      else {
        this.filter.sort = 'dateship:desc';
      }
      this.fetchData()
    }
  }

  approvalOrder(idOrder) {
    this.ordersProcessStore.updateState(idOrder,2).subscribe(() => {
      this.toastr.success("Approval order #" + idOrder + " successfully")
      let totalStore = this.ordersProcessStore.orders.length;
      if(totalStore == 1) {
        this.filter.pageindex = this.filter.pageindex - 1;
        this.paginator.pageIndex = this.filter.pageindex - 1;
      }
      this.fetchData()
      this.approvalEvent.emit();
    }, (error: HttpErrorResponse) => {
      if(error.status == 400) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 404) {
        this.toastr.error("Not found order #" + idOrder)
      }
    })
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
          let totalStore = this.ordersProcessStore.orders.length;
          if(totalStore == 1) {
            this.filter.pageindex = this.filter.pageindex - 1;
            this.paginator.pageIndex = this.filter.pageindex - 1;
          }
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found order #" + idOrder)
          }
        })
      }
    });
  }

  viewDetailOrder(idOrder) {
    const dialogRef = this.dialog.open(OrdersDetailFormComponent, {
      width: '900px',
      data: { 
       idOrder:idOrder
      }
    });
  }

}
