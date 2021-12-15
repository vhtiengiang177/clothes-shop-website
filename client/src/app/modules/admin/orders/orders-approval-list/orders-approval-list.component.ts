import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersApprovalStoreService } from 'src/app/services/store/orders-approval-store/orders-approval-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';


@Component({
  selector: 'app-orders-approval-list',
  templateUrl: './orders-approval-list.component.html',
  styleUrls: ['./orders-approval-list.component.css']
})
export class OrdersApprovalListComponent implements OnInit {

  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter2: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 2,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersApprovalStore: OrdersApprovalStoreService, public dialog: MatDialog,
    private authService : AuthService,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) { 
      // this.staffStore.staff$.subscribe(res => {
      //   if(res.length == 0) {
      //     this.staffStore.getAllStaff()
      //   }
      //   else {
      //     this.ordersApprovalStore.orders$.subscribe(res => {
      //       if (res) {
      //         this.getNameStaff()
      //       }
      //     })
      //   }
      // })

      // this.fetchData()
    }


  ngOnInit() {
  }

  onPaginateApproval(pageEvent: PageEvent) {
    this.filter2.pagesize = +pageEvent.pageSize;
    this.filter2.pageindex = +pageEvent.pageIndex + 1;
    this.fetchDataApproval()
  }
  
  fetchDataApproval() {
    this.ordersApprovalStore.getAll(this.filter2);
  }

  reloadOrderApproval() {
    this.filter2 = {
      pageindex: 1,
      pagesize: this.filter2.pagesize,
      idState: 2,
      sort: this.filter2.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchDataApproval()
  }

  searchEventApproval(content) {
    this.filter2 = {
      pageindex: 1,
      pagesize: this.filter2.pagesize,
      sort: this.filter2.sort,
      idState: 2,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchDataApproval()
  }

  sortIDApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'id:asc') {
        this.filter2.sort = 'id:asc';
      }
      else {
        this.filter2.sort = null;
      }
      this.fetchDataApproval()
    }
  }

  sortDateOrdersApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'dateorder:asc') {
        this.filter2.sort = 'dateorder:asc';
      }
      else {
        this.filter2.sort = 'dateorder:desc';
      }
      this.fetchDataApproval()
    }
  }

  sortIdShipperApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'idshipper:asc') {
        this.filter2.sort = 'idshipper:asc';
      }
      else {
        this.filter2.sort = null;
      }
      this.fetchDataApproval()
    }
  }

  sortIdEmployeeApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'idemployee:asc') {
        this.filter2.sort = 'idemployee:asc';
      }
      else {
        this.filter2.sort = null;
      }
      this.fetchDataApproval()
    }
  }

  sortDatePaymentApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'datepayment:asc') {
        this.filter2.sort = 'datepayment:asc';
      }
      else {
        this.filter2.sort = 'datepayment:desc';
      }
      this.fetchDataApproval()
    }
  }

  sortDateShipApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter2.sort != 'dateship:asc') {
        this.filter2.sort = 'dateship:asc';
      }
      else {
        this.filter2.sort = 'dateship:desc';
      }
      this.fetchDataApproval()
    }
  }

  getNameStaffApproval() {
    this.ordersApprovalStore.orders.forEach((item:Order) => {
        item.shipper = this.staffStore.staff.filter(x => x.idAccount == item.idShipper)[0].firstName
        item.staff = this.staffStore.staff.filter(x => x.idAccount == item.idStaff)[0].firstName
        
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
        this.ordersApprovalStore.updateState(idOrder,5).subscribe(() => {
          this.toastr.success("Cancel order #" + idOrder + " successfully")
          let totalStore = this.ordersApprovalStore.orders.length;
          if(totalStore == 1) {
            this.filter2.pageindex = this.filter2.pageindex - 1;
            this.paginator.pageIndex = this.filter2.pageindex - 1;
          }
          this.fetchDataApproval()
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

  deliveryOrder(idOrder) {
    this.ordersApprovalStore.updateState(idOrder,3).subscribe(() => {
      this.toastr.success("Delivery order #" + idOrder + " successfully")
      let totalStore = this.ordersApprovalStore.orders.length;
      if(totalStore == 1) {
        this.filter2.pageindex = this.filter2.pageindex - 1;
        this.paginator.pageIndex = this.filter2.pageindex - 1;
      }
      this.fetchDataApproval()
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
