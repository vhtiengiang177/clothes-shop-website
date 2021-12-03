import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { OrdersCancelledStoreService } from 'src/app/services/store/orders-cancelled-store/orders-cancelled-store.service';


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

  constructor(private ordersCancelledStore: OrdersCancelledStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

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
  sortTotalQuantity() {
    if(this.ordersCancelledStore.totalData !== 0) {
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
    if(this.ordersCancelledStore.totalData !== 0) {
      if(this.filter.sort != 'totalamount:asc') {
        this.filter.sort = 'totalamount:asc';
      }
      else {
        this.filter.sort = 'totalamount:desc';
      }
      this.fetchData()
    }
  }
  

}
