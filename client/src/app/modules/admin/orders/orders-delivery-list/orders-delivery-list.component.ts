import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { OrdersDeliveryStoreService } from 'src/app/services/store/orders-Delivery-store/orders-Delivery-store.service';

@Component({
  selector: 'app-orders-delivery-list',
  templateUrl: './orders-delivery-list.component.html',
  styleUrls: ['./orders-delivery-list.component.css']
})
export class OrdersDeliveryListComponent implements OnInit {

  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 3,
    sort: null
  };

  constructor(private ordersDeliveryStore: OrdersDeliveryStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.ordersDeliveryStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 2,
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
      idState: 2,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersDeliveryStore.totalData !== 0) {
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
    if(this.ordersDeliveryStore.totalData !== 0) {
      if(this.filter.sort != 'dateorder:asc') {
        this.filter.sort = 'dateorder:asc';
      }
      else {
        this.filter.sort = 'dateorder:desc';
      }
      this.fetchData()
    }
  }
  sortTotalQuantity() {
    if(this.ordersDeliveryStore.totalData !== 0) {
      if(this.filter.sort != 'totalquantity:asc') {
        this.filter.sort = 'totalquantity:asc';
      }
      else {
        this.filter.sort = 'totalquantity:desc';
      }
      this.fetchData()
    }
  }

  sortTotalAmount() {
    if(this.ordersDeliveryStore.totalData !== 0) {
      if(this.filter.sort != 'totalamount:asc') {
        this.filter.sort = 'totalamount:asc';
      }
      else {
        this.filter.sort = 'totalamount:desc';
      }
      this.fetchData()
    }
  }

  returnOrder(idOrder) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to return the order",
        id: idOrder
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.ordersDeliveryStore.updateState(idOrder,6).subscribe(() => {
          this.toastr.success("Return order #" + idOrder + " successfully")
          let totalStore = this.ordersDeliveryStore.orders.length;
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

  completeOrder(idOrder) {
    this.ordersDeliveryStore.updateState(idOrder,4).subscribe(() => {
      this.toastr.success("Completed order #" + idOrder + " successfully")
      let totalStore = this.ordersDeliveryStore.orders.length;
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

}
