import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersDeliveryStoreService } from 'src/app/services/store/orders-Delivery-store/orders-Delivery-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';

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

  staff: Staff = {}

  constructor(private ordersDeliveryStore: OrdersDeliveryStoreService, public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) { 
      this.staffStore.staff$.subscribe(res => {
        if(res.length == 0) {
          this.staffStore.getAllStaff()
        }
        else {
          this.ordersDeliveryStore.orders$.subscribe(res => {
            if (res) {
              this.getNameStaff()
            }
          })
        }
      })

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

  sortIdShipper() {
    if(this.ordersDeliveryStore.totalData !== 0) {
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
    if(this.ordersDeliveryStore.totalData !== 0) {
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
    if(this.ordersDeliveryStore.totalData !== 0) {
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
    if(this.ordersDeliveryStore.totalData !== 0) {
      if(this.filter.sort != 'dateship:asc') {
        this.filter.sort = 'dateship:asc';
      }
      else {
        this.filter.sort = 'dateship:desc';
      }
      this.fetchData()
    }
  }

  getNameStaff() {
    this.ordersDeliveryStore.orders.forEach((item:Order) => {
        item.shipper = this.staffStore.staff.filter(x => x.idAccount == item.idShipper)[0].firstName
        item.staff = this.staffStore.staff.filter(x => x.idAccount == item.idStaff)[0].firstName
        
    }) 
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
