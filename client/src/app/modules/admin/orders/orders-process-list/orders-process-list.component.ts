import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';

@Component({
  selector: 'app-orders-process-list',
  templateUrl: './orders-process-list.component.html',
  styleUrls: ['./orders-process-list.component.css']
})
export class OrdersProcessListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState:1,
    sort: null
  };

  constructor(private ordersProcessStore: OrdersProcessingStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

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
  sortTotalQuantity() {
    if(this.ordersProcessStore.totalData !== 0) {
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
    if(this.ordersProcessStore.totalData !== 0) {
      if(this.filter.sort != 'totalamount:asc') {
        this.filter.sort = 'totalamount:asc';
      }
      else {
        this.filter.sort = 'totalamount:desc';
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
        this.ordersProcessStore.updateState(idOrder,5).subscribe(() => {
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

}
