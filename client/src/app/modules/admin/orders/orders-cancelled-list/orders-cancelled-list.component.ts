import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersCancelledStoreService } from 'src/app/services/store/orders-cancelled-store/orders-cancelled-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';


@Component({
  selector: 'app-orders-cancelled-list',
  templateUrl: './orders-cancelled-list.component.html',
  styleUrls: ['./orders-cancelled-list.component.css']
})
export class OrdersCancelledListComponent implements OnInit {
  
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 5,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersCancelledStore: OrdersCancelledStoreService, public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) { 
      this.staffStore.staff$.subscribe(res => {
        if(res.length == 0) {
          this.staffStore.getAllStaff()
        }
        else {
          this.ordersCancelledStore.orders$.subscribe(res => {
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
    this.ordersCancelledStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 5,
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
      idState: 5,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
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
    this.ordersCancelledStore.orders.forEach((item:Order) => {
        item.shipper = this.staffStore.staff.filter(x => x.idAccount == item.idShipper)[0].firstName
        item.staff = this.staffStore.staff.filter(x => x.idAccount == item.idStaff)[0].firstName
        
    }) 
  }

}
