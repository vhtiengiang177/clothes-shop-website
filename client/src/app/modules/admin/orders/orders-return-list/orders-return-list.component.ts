import { filter } from 'rxjs/operators';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent, SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { OrdersReturnStoreService } from 'src/app/services/store/orders-return-store/orders-return-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { Order } from 'src/app/services/model/order/order.model';


@Component({
  selector: 'app-orders-return-list',
  templateUrl: './orders-return-list.component.html',
  styleUrls: ['./orders-return-list.component.css']
})
export class OrdersReturnListComponent implements OnInit {

  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 6,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersReturnStore: OrdersReturnStoreService, public dialog: MatDialog,
    private staffStore:StaffStoreService,
    private toastr: ToastrService) {

      this.staffStore.staff$.subscribe(res => {
        if(res.length == 0) {
          this.staffStore.getAllStaff()
        }
        else {
          this.ordersReturnStore.orders$.subscribe(res => {
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
    this.ordersReturnStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 6,
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
      idState: 6,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortIdShipper() {
    if(this.ordersReturnStore.totalData !== 0) {
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
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'idemployee:asc') {
        this.filter.sort = 'idemployee:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDateOrders() {
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'dateorder:asc') {
        this.filter.sort = 'dateorder:asc';
      }
      else {
        this.filter.sort = 'dateorder:desc';
      }
      this.fetchData()
    }
  }
  sortDatePayment() {
    if(this.ordersReturnStore.totalData !== 0) {
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
    if(this.ordersReturnStore.totalData !== 0) {
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
    this.ordersReturnStore.orders.forEach((item:Order) => {
        item.shipper = this.staffStore.staff.filter(x => x.idAccount == item.idShipper)[0].firstName
        item.staff = this.staffStore.staff.filter(x => x.idAccount == item.idStaff)[0].firstName
        
    }) 
  }
}
